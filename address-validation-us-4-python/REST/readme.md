![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# AV4 - Address Validation – US 4

DOTS Address Validation 4 US (“AV4”) is a new version of our Address Validation and Address Validation 3 Web services. This service utilizes the latest .Net Framework, WCF, and can be used as a RESTful service. AV4 is designed to take an unstandardized address, validate it against the latest USPS data, and return standardized, deliverable addresses. 

The service provides corrected information such as the correct street location and zip plus four code, along with parsed address tokens, such as the PMB box number, pre- and post-directionals, county and state codes, and much more.

AV4 can provide instant address verification and correction to websites or enhancement to contact lists.  However, the output from AV4 must be considered carefully before the existence or non-existence of an address is decided. AV4 can be used in three modes. Mode 1, is for doing the standard validation as it always has with USPS datasets and expert address validation techniques. Mode 2, uses standard rules plus aggregated non-USPS datasets. And, mode 3, enhanced rules plus name and phone assisted address nudging, using proprietary data.


## [Service Objects Website](https://serviceobjects.com)

# AV4 - ValidateAddress 

This operation can be used in three modes. Mode 1, is for doing the standard validation as it always has with USPS datasets and expert address validation techniques. Mode 2, uses standard rules plus aggregated non-USPS datasets. And, mode 3, enhanced rules plus name and phone assisted address nudging, using proprietary data.

### [ValidateAddress Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-address-validation-us-4/av4-operations/av4-validateaddress-recommended/)

## Library Usage

```
# 1. Build the input
#
#  Fields:
#       mode
#       city
#       address1
#       address2
#       state
#       zip 
#       business_name
#       full_name
#       first_name
#       middle_name
#       last_name
#       phone_number
#       options
#       timeout_seconds
#       auth_id
#       is_live


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

from validate_address_rest import validate_address

# 2. Call the method.
response = validate_address(mode, address1, address2, city, state, zip, business_name, first_name, middle_name, last_name, phone_number, options, auth_id, is_live, timeout_seconds)

# 3. Inspect results.
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
```

