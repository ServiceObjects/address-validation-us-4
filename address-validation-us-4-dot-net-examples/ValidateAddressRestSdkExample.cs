
using address_validation_us_4_dot_net.REST;
using System;


namespace address_validation_us_4_dot_net_examples
{
    public static class ValidateAddressRestSdkExample
    {
        public static void Go(string licenseKey, bool isLive)
        {
            Console.WriteLine("\r\n------------------------------------------------");
            Console.WriteLine("Address Validation US 4 - AV4Response - REST SDK");
            Console.WriteLine("------------------------------------------------");

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

            Console.WriteLine("\r\n* Input *\r\n");
            Console.WriteLine($"Mode        : {validateAddressInput.Mode}");
            Console.WriteLine($"Address1    : {validateAddressInput.Address1}");
            Console.WriteLine($"Address2    : {validateAddressInput.Address2}");
            Console.WriteLine($"City        : {validateAddressInput.City}");
            Console.WriteLine($"State       : {validateAddressInput.State}");
            Console.WriteLine($"ZIP         : {validateAddressInput.ZIP}");
            Console.WriteLine($"BusinessName: {validateAddressInput.BusinessName}");
            Console.WriteLine($"FirstName   : {validateAddressInput.FirstName}");
            Console.WriteLine($"MiddleName  : {validateAddressInput.MiddleName}");
            Console.WriteLine($"LastName    : {validateAddressInput.LastName}");
            Console.WriteLine($"PhoneNumber : {validateAddressInput.PhoneNumber}");
            Console.WriteLine($"Options     : {validateAddressInput.Options}");
            Console.WriteLine($"AuthID      : {validateAddressInput.AuthID}");
            Console.WriteLine($"IsLive      : {validateAddressInput.IsLive}");

            AV4ResponseWrapper response = ValidateAddressClient.Invoke(validateAddressInput);

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
        }
    }
}