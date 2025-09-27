import { ValidateAddressClient } from "../address-validation-us-4-nodejs/REST/validate_address_rest.js";

export async function validateAddressGO(authId, isLive) {
    console.log("\n---------------------------------------------------------");
    console.log("Address Validation US 4 - ValidateAddressInput - REST SDK");
    console.log("---------------------------------------------------------");

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
    const authId = authId;
    const isLive = true;

    console.log("\n* Input *\n");
    console.log(`Mode        : ${mode}`);
    console.log(`Address1    : ${address1}`);
    console.log(`Address2    : ${address2}`);
    console.log(`City        : ${city}`);
    console.log(`State       : ${state}`);
    console.log(`ZIP         : ${zip}`);
    console.log(`BusinessName: ${businessName}`);
    console.log(`FirstName   : ${firstName}`);
    console.log(`MiddleName  : ${middleName}`);
    console.log(`LastName    : ${lastName}`);
    console.log(`PhoneNumber : ${phoneNumber}`);
    console.log(`Options     : ${options}`);
    console.log(`AuthID      : ${authId}`);
    console.log(`IsLive      : ${isLive}`);

    try {
        const response = await ValidateAddressClient.invoke(mode,
                                                            address1,
                                                            address2,
                                                            city,
                                                            state,
                                                            zip,
                                                            businessName,
                                                            firstName,
                                                            middleName,
                                                            lastName,
                                                            phoneNumber,
                                                            options,
                                                            authId,
                                                            isLive,
                                                            timeoutSeconds);

        if (!response.ProblemDetails) {
            if (response.Addresses) {
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
                        console.log(`\tDpv                   : ${address.addressNotes.dpv}`);
                        console.log(`\tDpvDesc               : ${address.addressNotes.dpvDesc}`);
                        console.log(`\tCorroborations        : ${address.addressNotes.corroborations}`);
                        console.log(`\tIsResidentialLocation : ${address.addressNotes.isResidentialLocation}`);
                        console.log(`\tZip4Added             : ${address.addressNotes.zip4Added}`);
                    } else {
                        console.log("\tNo address notes found.");
                    }
                    console.log("}");
                    console.log("\n");
                });
            } else {
                console.log("No address information found.");
            }

            if (response.ParsedInput) {
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
            } else {
                console.log("No parsed input information found.");
            }
        } else {
            console.log("\n* ProblemDetails *\n");
            console.log(`Problem Details Type : ${response.ProblemDetails.type}`);
            console.log(`Problem Details Title : ${response.ProblemDetails.title}`);
            console.log(`Problem Details Status: ${response.ProblemDetails.status}`);
            console.log(`Problem Details Detail: ${response.ProblemDetails.detail}`);
        }
    } catch (e) {
        console.error(`\nException occurred: ${e.message}`);
        console.error(`Stack Trace: ${e.stack}`);
    }
}
