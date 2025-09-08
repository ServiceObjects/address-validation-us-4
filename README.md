![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# AV4 - Address Validation US 4

DOTS Address Validation 4 US (“AV4”) is a new version of our Address Validation and Address Validation 3 Web services. This service utilizes the latest .Net Framework, WCF, and can be used as a RESTful service. AV4 is designed to take an unstandardized address, validate it against the latest USPS data, and return standardized, deliverable addresses. The service provides corrected information such as the correct street location and zip plus four code, along with parsed address tokens, such as the PMB box number, pre- and post-directionals, county and state codes, and much more.

AV4 can provide instant address verification and correction to websites or enhancement to contact lists.  However, the output from AV4 must be considered carefully before the existence or non-existence of an address is decided. AV4 can be used in three modes. Mode 1, is for doing the standard validation as it always has with USPS datasets and expert address validation techniques. Mode 2, uses standard rules plus aggregated non-USPS datasets. And, mode 3, enhanced rules plus name and phone assisted address nudging, using proprietary data.

## [Service Objects Website](https://serviceobjects.com)
## [Developer Guide/Documentation](https://www.serviceobjects.com/docs/)

# AV4 - ValidateAddress

Returns parsed and validated address elements including Delivery Point Validation (DPV), Residential Delivery Indicator (RDI), and Suite data. ValidateAddress will attempt to validate the input address against a CASS approved engine and make corrections where possible. Depending on the mode being used, in addition to the USPS data source, supplemental data sources are employed to help validate addresses. Mode 3 also incorporates person name and phone number to assist with validation. The service easily integrated using our OpenAPI specification or simply by making REST calls to the operation. The response structure in the REST calls is of JSON format.

## [ValidateAddress Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-address-validation-us-4/av4-operations/av4-validateaddress-recommended/)

## ValidateAddress Request URLs (Query String Parameters)

>[!CAUTION]
>### *Important - Use query string parameters for all inputs.  Do not use path parameters since it will lead to errors due to optional parameters and special character issues.*


### JSON
#### Trial

https://trial.serviceobjects.com/AV4/ValidateAddress?Mode=1&Address1=136+W+Canon+Perdido+St%2C+Suite+D&Address2=&City=Santa+Barbara&State=CA&ZIP=93101&BusinessName=Service+Objects&FullName=&FirstName=&MiddleName=&LastName=&Phone=&Options=&AuthID={LicenseKey}

#### Production

https://sws.serviceobjects.com/AV4/ValidateAddress?Mode=1&Address1=136+W+Canon+Perdido+St%2C+Suite+D&Address2=&City=Santa+Barbara&State=CA&ZIP=93101&BusinessName=Service+Objects&FullName=&FirstName=&MiddleName=&LastName=&Phone=&Options=&AuthID={LicenseKey}

#### Production Backup

https://swsbackup.serviceobjects.com/AV4/ValidateAddress?Mode=1&Address1=136+W+Canon+Perdido+St%2C+Suite+D&Address2=&City=Santa+Barbara&State=CA&ZIP=93101&BusinessName=Service+Objects&FullName=&FirstName=&MiddleName=&LastName=&Phone=&Options=&AuthID={LicenseKey}
