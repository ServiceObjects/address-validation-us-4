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
// 1. Build the input
//
//  Fields:
//       mode
//       address1
//       address2
//       city
//       state
//       zip 
//       businessName
//       fullName
//       firstName
//       middleName
//       lastName
//       phoneNumber
//       options
//       authId
//       isLive
// 
// Optional:
//       timeoutSeconds

 import { ValidateAddressClient } from "../address-validation-us-4-nodejs/src/REST/validate_address_rest.js";

const mode = "1";
const address1 = "136 W Canon Perdido St, Suite D";
const address2 = "";
const city = "Santa Barbara";
const state = "CA";
const zip = "93101";
const businessName = "Service Objects";
const firstName = "";
const middleName = "";
const lastName = "";
const phoneNumber = "8059631700";
const options = "";
const timeoutSeconds = 15;
const authId = "YOUR AUTH ID";
const isLive = true;

// 2. Call the sync Invoke() method.
 const response = await ValidateAddressClient.invoke(mode, address1, address2, city, state, zip, businessName, firstName, middleName, lastName, phoneNumber, options, authId, isLive, timeoutSeconds);

// 3. Inspect results.

if (!response.ProblemDetails) 
{
    if (response.Addresses)
    {
        console.log("\n* Address Info *\n");
        response.Addresses.forEach(address => {
        console.log(`Rating          : ${address.rating}`);
        console.log(`Validation Type : ${address.validationType}`);
        console.log(`Address         : ${address.address}`);
        console.log(`Address Extra   : ${address.addressExtra}`);
        console.log(`City            : ${address.city}`);
        console.log(`State           : ${address.state}`);
        console.log(`Zip             : ${address.zip}`);
        console.log(`County Name     : ${address.countyName}`);
        console.log(`Primary Number  : ${address.primaryNumber}`);
        console.log(`Pre-Directional : ${address.preDirectional}`);
        console.log(`Post-Directional: ${address.postDirectional}`);
        console.log(`Street Name     : ${address.streetName}`);
        console.log(`Street Suffix   : ${address.streetSuffix}`);
        console.log(`Secondary Type  : ${address.secondaryType}`);
        console.log(`Secondary Number: ${address.secondaryNumber}`);
        console.log(`PMB Type        : ${address.pmbType}`);
        console.log(`PMB Number      : ${address.pmbNumber}`);
        console.log(`Barcode Digits  : ${address.barcodeDigits}`);
        console.log(`Carrier Route   : ${address.carrierRoute}`);
        console.log(`Congress Code   : ${address.congressCode}`);
        console.log(`Address Notes   : {`);
        if (address.addressNotes) {
        console.log(`\tDpv              : ${address.addressNotes.dpv}`);
        console.log(`\tDpvDesc         : ${address.addressNotes.dpvDesc}`);
        console.log(`\tCorroborations  : ${address.addressNotes.corroborations}`);
        console.log(`\tIsResidentialLocation: ${address.addressNotes.isResidentialLocation}`);
        console.log(`\tZip4Added       : ${address.addressNotes.zip4Added}`);
        } 
        else
        {
            console.log("\tNo address notes found.");
        }
        console.log(`}`);
        console.log("\n");
        });
    } 
    else
    {
        console.log("No address information found.");
    }

    if (response.ParsedInput)
    {
        console.log("\n* Parsed Input *\n");
        console.log(`Address         : ${response.ParsedInput.address}`);
        console.log(`Address Extra   : ${response.ParsedInput.addressExtra}`);
        console.log(`City            : ${response.ParsedInput.city}`);
        console.log(`State           : ${response.ParsedInput.state}`);
        console.log(`Zip             : ${response.ParsedInput.zip}`);
        console.log(`Primary Number  : ${response.ParsedInput.primaryNumber}`);
        console.log(`Pre-Directional : ${response.ParsedInput.preDirectional}`);
        console.log(`Post-Directional: ${response.ParsedInput.postDirectional}`);
        console.log(`Street Name     : ${response.ParsedInput.streetName}`);
        console.log(`Street Suffix   : ${response.ParsedInput.streetSuffix}`);
        console.log(`Secondary Type  : ${response.ParsedInput.secondaryType}`);
        console.log(`Secondary Number: ${response.ParsedInput.secondaryNumber}`);
        console.log(`Phone Number    : ${response.ParsedInput.phoneNumber}`);
        console.log(`First Name      : ${response.ParsedInput.firstName}`);
        console.log(`Middle Name     : ${response.ParsedInput.middleName}`);
        console.log(`Last Name       : ${response.ParsedInput.lastName}`);
    } 
    else
    {
        console.log("No parsed input information found.");
    }
} 
else
{
    console.log("\n* ProblemDetails *\n");
    console.log(`Problem Details Type  : ${response.ProblemDetails.type}`);
    console.log(`Problem Details Title : ${response.ProblemDetails.title}`);
    console.log(`Problem Details Status: ${response.ProblemDetails.status}`);
    console.log(`Problem Details Detail: ${response.ProblemDetails.detail}`);
}
```

