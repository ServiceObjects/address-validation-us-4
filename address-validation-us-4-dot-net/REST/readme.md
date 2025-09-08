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
// Required fields:
//               Mode
//               City
//               State
//               Address1
//               ZIP 
//               AuthID
//               IsLive
// 
// Optional:
//       Address2
//       BusinessName
//       FullName
//       FirstName
//       MiddleName
//       LastName
//       PhoneNumber
//       Options
//       TimeoutSeconds (default: 15)

using address_validation_us_4_dot_net.REST;

ValidateAddressClient.ValidateAddressInput validateAddressInput = new(
               Mode: "1",
               Address1: "136 W Canon Perdido St, Suite D",
               Address2: "",
               City: "Santa Barbara",
               State: "CA",
               ZIP: "93101",
               BusinessName: "Service Objects",
               FirstName: "",
               MiddleName: "",
               LastName: "",
               PhoneNumber: "8059631700",
               Options: "",
               AuthID: licenseKey,
               IsLive: isLive,
               TimeoutSeconds: 15
);

// 2. Call the sync Invoke() method.
AV4ResponseWrapper response = ValidateAddressClient.Invoke(validateAddressInput);

// 3. Inspect results.
if (response.ProblemDetails is null)
{
    if (response.ValidateAddressResponse?.Addresses?.Count > 0)
    {
        Console.WriteLine("\r\n* Address Info *\r\n");
        foreach (var address in response.ValidateAddressResponse.Addresses)
        {
            Console.WriteLine($"Rating          : {address.Rating}");
            Console.WriteLine($"Validation Type : {address.ValidationType}");
            Console.WriteLine($"Address         : {address.Address}");
            Console.WriteLine($"Address Extra   : {address.AddressExtra}");
            Console.WriteLine($"City            : {address.City}");
            Console.WriteLine($"State           : {address.State}");
            Console.WriteLine($"Zip             : {address.Zip}");
            Console.WriteLine($"County Name     : {address.CountyName}");
            Console.WriteLine($"Primary Number  : {address.PrimaryNumber}");
            Console.WriteLine($"Pre-Directional : {address.PreDirectional}");
            Console.WriteLine($"Post-Directional: {address.PostDirectional}");
            Console.WriteLine($"Street Name     : {address.StreetName}");
            Console.WriteLine($"Street Suffix   : {address.StreetSuffix}");
            Console.WriteLine($"Secondary Type  : {address.SecondaryType}");
            Console.WriteLine($"Secondary Number: {address.SecondaryNumber}");
            Console.WriteLine($"PMB Type        : {address.PmbType}");
            Console.WriteLine($"PMB Number      : {address.PmbNumber}");
            Console.WriteLine($"Barcode Digits  : {address.BarcodeDigits}");
            Console.WriteLine($"Carrier Route   : {address.CarrierRoute}");
            Console.WriteLine($"Congress Code   : {address.CongressCode}");
            Console.WriteLine($"Address Notes   : {string.Join(", ", address.AddressNotes)}");
            Console.WriteLine("\r\n");
        }
    }
    else
    {
        Console.WriteLine("No address information found.");
    }

    if (response.ValidateAddressResponse?.ParsedInput != null)
    {
        Console.WriteLine("* Parsed Input  *\r\n");
        Console.WriteLine($"Address         : {response.ValidateAddressResponse.ParsedInput.Address}");
        Console.WriteLine($"Address Extra   : {response.ValidateAddressResponse.ParsedInput.AddressExtra}");
        Console.WriteLine($"City            : {response.ValidateAddressResponse.ParsedInput.City}");
        Console.WriteLine($"State           : {response.ValidateAddressResponse.ParsedInput.State}");
        Console.WriteLine($"Zip             : {response.ValidateAddressResponse.ParsedInput.Zip}");
        Console.WriteLine($"Primary Number  : {response.ValidateAddressResponse.ParsedInput.PrimaryNumber}");
        Console.WriteLine($"Pre-Directional : {response.ValidateAddressResponse.ParsedInput.PreDirectional}");
        Console.WriteLine($"Post-Directional: {response.ValidateAddressResponse.ParsedInput.PostDirectional}");
        Console.WriteLine($"Street Name     : {response.ValidateAddressResponse.ParsedInput.StreetName}");
        Console.WriteLine($"Street Suffix   : {response.ValidateAddressResponse.ParsedInput.StreetSuffix}");
        Console.WriteLine($"Secondary Type  : {response.ValidateAddressResponse.ParsedInput.SecondaryType}");
        Console.WriteLine($"Secondary Number: {response.ValidateAddressResponse.ParsedInput.SecondaryNumber}");
    }
    else
    {
        Console.WriteLine("No parsed input information found.");
    }
}
else
{
    Console.WriteLine("\r\n* ProblemDetails *\r\n");
    Console.WriteLine($"ProblemDetails Title : {response.ProblemDetails.Title}");
    Console.WriteLine($"ProblemDetails Status: {response.ProblemDetails.Status}");
    Console.WriteLine($"ProblemDetails Detail: {response.ProblemDetails.Detail}");
}
```