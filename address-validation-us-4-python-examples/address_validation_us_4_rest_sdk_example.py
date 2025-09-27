import sys
import os

sys.path.insert(0, os.path.abspath("../address-validation-us-4-python/REST"))

from validate_address_rest import validate_address


def validate_address_sdk_go(is_live: bool, license_key: str) -> None:
    print("\n---------------------------------------------------------")
    print("Address Validation US 4 - ValidateAddressInput - REST SDK")
    print("---------------------------------------------------------")

    mode = "1"
    address1 = "136 W Canon Perdido St, Suite D"
    address2 = ""
    city = "Santa Barbara"
    state = "CA"
    zip = "93101"
    business_name = "Service Objects"
    first_name = ""
    middle_name = ""
    last_name = ""
    phone_number = "8059631700"
    options = ""
    auth_id = "YOUR AUTH ID"
    is_live = True
    timeout_seconds = 15


    print("\n* Input *\n")
    print(f"Mode        : {mode}")
    print(f"Address1    : {address1}")
    print(f"Address2    : {address2}")
    print(f"City        : {city}")
    print(f"State       : {state}")
    print(f"ZIP         : {zip}")
    print(f"BusinessName: {business_name}")
    print(f"FirstName   : {first_name}")
    print(f"MiddleName  : {middle_name}")
    print(f"LastName    : {last_name}")
    print(f"PhoneNumber : {phone_number}")
    print(f"Options     : {options}")
    print(f"AuthID      : {auth_id}")
    print(f"IsLive      : {is_live}")
    print(f"TimeoutSeconds : {timeout_seconds}")

    try:
        response = validate_address(mode, address1, address2, city, state, zip, business_name, first_name, middle_name, last_name, phone_number, options, auth_id, is_live, timeout_seconds)

        if response.ProblemDetails is None:
            print("\n* Address Info *\n")
            if hasattr(response, 'Addresses') and response.Addresses:
                for address in response.Addresses:
                    print(f"Address:")
                    print(f"Rating          : {address.rating}")
                    print(f"Validation Type : {address.validationType}")
                    print(f"Validation Type Value : {address.validationTypeValue}")
                    print(f"Address         : {address.address}")
                    print(f"Address Extra   : {address.addressExtra}")
                    print(f"City            : {address.city}")
                    print(f"State           : {address.state}")
                    print(f"Zip             : {address.zip}")
                    print(f"County Name     : {address.countyName}")
                    print(f"Primary Number  : {address.primaryNumber}")
                    print(f"Pre-Directional : {address.preDirectional}")
                    print(f"Post-Directional: {address.postDirectional}")
                    print(f"Street Name     : {address.streetName}")
                    print(f"Street Suffix   : {address.streetSuffix}")
                    print(f"Secondary Type  : {address.secondaryType}")
                    print(f"Secondary Number: {address.secondaryNumber}")
                    print(f"PMB Type        : {address.pmbType}")
                    print(f"PMB Number      : {address.pmbNumber}")
                    print(f"Barcode Digits  : {address.barcodeDigits}")
                    print(f"Carrier Route   : {address.carrierRoute}")
                    print(f"Congress Code   : {address.congressCode}")
                    print(f"Address Notes   : {{")
                    if hasattr(address, 'addressNotes') and address.addressNotes:
                        print(f"\t{', '.join(address.addressNotes)}")
                    else:
                        print("\tNo address notes found.")
                    print("}")
                    print("")
            else:
                print("No address information found.")

            print("\n* Parsed Input *\n")
            if hasattr(response, 'ParsedInput') and response.ParsedInput:
                print(f"Address         : {response.ParsedInput.address}")
                print(f"Address Extra   : {response.ParsedInput.addressExtra}")
                print(f"City            : {response.ParsedInput.city}")
                print(f"State           : {response.ParsedInput.state}")
                print(f"Zip             : {response.ParsedInput.zip}")
                print(f"Primary Number  : {response.ParsedInput.primaryNumber}")
                print(f"Pre-Directional : {response.ParsedInput.preDirectional}")
                print(f"Post-Directional: {response.ParsedInput.postDirectional}")
                print(f"Street Name     : {response.ParsedInput.streetName}")
                print(f"Street Suffix   : {response.ParsedInput.streetSuffix}")
                print(f"Secondary Type  : {response.ParsedInput.secondaryType}")
                print(f"Secondary Number: {response.ParsedInput.secondaryNumber}")
                print(f"Phone Number    : {response.ParsedInput.phoneNumber}")
                print(f"First Name      : {response.ParsedInput.firstName}")
                print(f"Middle Name     : {response.ParsedInput.middleName}")
                print(f"Last Name       : {response.ParsedInput.lastName}")
            else:
                print("No parsed input information found.")

        else:
            print("\n* ProblemDetails *\n")
            print(f"ProblemDetails Title : {response.ProblemDetails.title}")
            print(f"ProblemDetails Status: {response.ProblemDetails.status}")
            print(f"ProblemDetails Detail: {response.ProblemDetails.detail}")

    except Exception as e:
        print(f"\nException occurred: {str(e)}")
