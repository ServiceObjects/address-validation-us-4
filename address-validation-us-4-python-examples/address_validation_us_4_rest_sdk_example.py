import sys
import os

sys.path.insert(0, os.path.abspath("../address-validation-us-4-python/REST"))

from validate_address_rest import validate_address


def validate_address_sdk_go(is_live: bool, license_key: str) -> None:
    print("\n---------------------------------------------------------")
    print("Address Validation US 4 - ValidateAddressInput - REST SDK")
    print("---------------------------------------------------------")

    Mode = "1"
    Address1 = "136 W Canon Perdido St, Suite D"
    Address2 = ""
    City = "Santa Barbara"
    State = "CA"
    ZIP = "93101"
    BusinessName = "Service Objects"
    FirstName = ""
    MiddleName = ""
    LastName = ""
    PhoneNumber = "8059631700"
    Options = ""
    AuthID = license_key
    IsLive = is_live
    TimeoutSeconds = 15

    print("\n* Input *\n")
    print(f"Mode        : {Mode}")
    print(f"Address1    : {Address1}")
    print(f"Address2    : {Address2}")
    print(f"City        : {City}")
    print(f"State       : {State}")
    print(f"ZIP         : {ZIP}")
    print(f"BusinessName: {BusinessName}")
    print(f"FirstName   : {FirstName}")
    print(f"MiddleName  : {MiddleName}")
    print(f"LastName    : {LastName}")
    print(f"PhoneNumber : {PhoneNumber}")
    print(f"Options     : {Options}")
    print(f"AuthID      : {AuthID}")
    print(f"IsLive      : {IsLive}")
    print(f"TimeoutSeconds : {TimeoutSeconds}")

    try:
        response = validate_address(
            Mode, Address1, Address2, City, State, ZIP, BusinessName,
            FirstName, MiddleName, LastName, PhoneNumber, Options,
            AuthID, IsLive, TimeoutSeconds
        )

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
