import requests
import json
from av4_response import AV4Response, AddressInfo, ParsedInputInfo, ProblemDetails

# Endpoint URLs for Address Validation US 4 ValidateAddress REST API
primary_url = 'https://strial.serviceobjects.com/AV4/ValidateAddress?'
backup_url = 'https://strialbackup.serviceobjects.com/AV4/ValidateAddress?'
trial_url = 'https://trial.serviceobjects.com/AV4/ValidateAddress?'

def validate_address(
    mode: str,
    address1: str,
    address2: str = "",
    city: str = "",
    state: str = "",
    zip_code: str = "",
    business_name: str = "",
    first_name: str = "",
    middle_name: str = "",
    last_name: str = "",
    phone_number: str = "",
    options: str = "",
    auth_id: str = "",
    is_live: bool = True,
    timeout_seconds: int = 15
) -> AV4Response:
    """
    Calls the Address Validation US 4 ValidateAddress API to retrieve parsed and validated address elements,
    including Delivery Point Validation (DPV), Residential Delivery Indicator (RDI), and Suite data.
    Validates input parameters and returns a ProblemDetails response if invalid. Uses a backup endpoint for reliability in live mode.

    Args:
        mode (str): Required. Values are "1", "2", or "3". Specifies the validation mode (1: USPS datasets, 2: non-USPS datasets, 3: name/phone-assisted).
        address1 (str): Required. The primary address line or single-line address.
        address2 (str, optional): Optional. The secondary address line (e.g., suite or apartment number).
        city (str, optional): The city of the address. Required if ZIP is not provided.
        state (str, optional): The state of the address. Required if ZIP is not provided.
        zip_code (str, optional): The ZIP code of the address. Required if City and State are not provided.
        business_name (str, optional): Optional. Company name for business addresses, may append SuiteLink data.
        first_name (str, optional):Optional. First name of the contact, used in Mode 3.
        middle_name (str, optional): Optional. Middle name of the contact, used in Mode 3.
        last_name (str, optional): Optional. Last name of the contact, used in Mode 3.
        phone_number (str, optional): Optional. Phone number for the contact, enables features like PhoneLink.
        options (str, optional): Optional. Reserved for future use.
        auth_id (str): Required. Required. Authentication ID provided by Service Objects.
        is_live (bool, optional): Option to use live service (true) or trial service (false).
        timeout_seconds (int, optional): Timeout in seconds for the HTTP request. Defaults to 15.

    Returns:
        AV4Response: Parsed JSON response with validated address details or a ProblemDetails if validation fails or the API call fails.
    """

    params = {
        'Mode': mode,
        'Address1': address1,
        'Address2': address2,
        'City': city,
        'State': state,
        'ZIP': zip_code,
        'BusinessName': business_name,
        'FirstName': first_name,
        'MiddleName': middle_name,
        'LastName': last_name,
        'PhoneNumber': phone_number,
        'Options': options,
        'AuthID': auth_id
    }

    url = primary_url if is_live else trial_url

    try:
        response = requests.get(url, params=params, timeout=timeout_seconds)
        response.raise_for_status()
        data = response.json()

        # If API returned an error in JSON payload, trigger fallback
        problem_details = data.get('ProblemDetails')
        if problem_details:
            if is_live:
                # Try backup URL
                response = requests.get(backup_url, params=params, timeout=timeout_seconds)
                response.raise_for_status()
                data = response.json()
                problem_details = data.get('ProblemDetails')
                if problem_details:
                    return AV4Response(
                        Status=None,
                        Addresses=None,
                        ParsedInput=None,
                        ProblemDetails=ProblemDetails(**problem_details)
                    )
            else:
                # Trial mode error is terminal
                return AV4Response(
                    Status=None,
                    Addresses=None,
                    ParsedInput=None,
                    ProblemDetails=ProblemDetails(**problem_details)
                )

        addresses = [AddressInfo(**addr) for addr in data.get('addresses', [])] if data.get('addresses') else None
        parsed_input = ParsedInputInfo(**data.get('parsedInput', {})) if data.get('parsedInput') else None

        return AV4Response(
            Status=data.get('status'),
            Addresses=addresses,
            ParsedInput=parsed_input,
            ProblemDetails=None
        )

    except requests.RequestException as req_exc:
        # Network or HTTP-level error occurred
        if is_live:
            try:
                # Fallback to backup URL
                response = requests.get(backup_url, params=params, timeout=timeout_seconds)
                response.raise_for_status()
                data = response.json()
                problem_details = data.get('ProblemDetails')
                if problem_details:
                    return AV4Response(
                        Status=None,
                        Addresses=None,
                        ParsedInput=None,
                        ProblemDetails=ProblemDetails(**problem_details)
                    )

                addresses = [AddressInfo(**addr) for addr in data.get('addresses', [])] if data.get('addresses') else None
                parsed_input = ParsedInputInfo(**data.get('parsedInput', {})) if data.get('parsedInput') else None

                return AV4Response(
                    Status=data.get('status'),
                    Addresses=addresses,
                    ParsedInput=parsed_input,
                    ProblemDetails=None
                )
            except Exception as backup_exc:
                data = json.loads(backup_exc.response.content)
                problem_details = ProblemDetails(
                    Type=data["type"],
                    Title=data["title"],
                    Status=data["status"]
                )
                return AV4Response(
                    Status=None,
                    Addresses=None,
                    ParsedInput=None,
                    ProblemDetails=problem_details
                )
        else:
            data = json.loads(req_exc.response.content)
            problem_details = ProblemDetails(
                Type=data["type"],
                Title=data["title"],
                Status=data["status"]
            )
            return AV4Response(
                Status=None,
                Addresses=None,
                ParsedInput=None,
                ProblemDetails=problem_details
            )