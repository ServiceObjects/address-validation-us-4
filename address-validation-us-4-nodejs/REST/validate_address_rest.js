import axios from 'axios';
import querystring from 'querystring';
import { AV4Response } from './av4_response.js';

/**
 * @constant
 * @type {string}
 * @description The base URL for the live ServiceObjects Address Validation US 4 API service.
 */
const LiveBaseUrl = 'https://sws.serviceobjects.com/AV4/';

/**
 * @constant
 * @type {string}
 * @description The base URL for the backup ServiceObjects Address Validation US 4 API service.
 */
const BackupBaseUrl = 'https://swsbackup.serviceobjects.com/AV4/';

/**
 * @constant
 * @type {string}
 * @description The base URL for the trial ServiceObjects Address Validation US 4 API service.
 */
const TrialBaseUrl = 'https://trial.serviceobjects.com/AV4/';

/**
 * Checks if a response from the API is valid by verifying that it either has no Error object
 * or the Error object does not have Status "500" (server error).
 * @param {AV4Response} response - The API response object to validate.
 * @returns {boolean} True if the response is valid, false otherwise.
 */
const isValid = (response) => !response?.ProblemDetails || response.ProblemDetails.status !== 500;

/**
 * Constructs a full URL for the ValidateAddress API endpoint by combining the base URL
 * with URL-encoded query parameters derived from the input parameters.
 * @param {Object} params - An object containing all the input parameters.
 * @param {string} baseUrl - The base URL for the API service (live, backup, or trial).
 * @returns {string} The constructed URL with query parameters.
 */
const buildUrl = (params, baseUrl) =>
    `${baseUrl}ValidateAddress?${querystring.stringify(params)}`;

/**
 * Performs an HTTP GET request to the specified URL with a given timeout.
 * @param {string} url - The URL to send the GET request to.
 * @param {number} timeoutSeconds - The timeout duration in seconds for the request.
 * @returns {Promise<AV4Response>} A promise that resolves to an AV4Response object containing the API response data.
 * @throws {Error} If the HTTP request fails, with a message detailing the error.
 */
export const httpGet = async (url, timeoutSeconds) => {
    let result = new AV4Response();
    try {
        const response = await axios.get(url, { timeout: timeoutSeconds * 1000 });

        if (response.status === 200) {
            result.Status = response.data.status ?? null;
            result.Addresses = response.data.addresses ?? null;
            result.ParsedInput = response.data.parsedInput ?? null;
            result.ProblemDetails = null;
        } else {
            result.ProblemDetails = {
                Title: "Service Objects Error",
                Status: response.status,
                Detail: response.statusText
            };
            result.Status = null;
            result.Addresses = null;
            result.ParsedInput = null;
        }
    } catch (error) {
        result.ProblemDetails = {
            type: error.response.data.type,
            title: error.response.data.title,
            status: error.response.data.status,
            detail: error.response.data.detail
        };
        result.Status = null;
        result.Addresses = null;
        result.ParsedInput = null;
    }
    return result;
};

/**
 * Provides functionality to call the ServiceObjects Address Validation US 4 API's ValidateAddress endpoint,
 * retrieving parsed and validated address elements including Delivery Point Validation (DPV),
 * Residential Delivery Indicator (RDI), and Suite data with fallback to a backup endpoint for reliability in live mode.
 */
const ValidateAddressClient = {
    /**
     * Asynchronously invokes the ValidateAddress API endpoint, validating input parameters
     * and attempting the primary endpoint first, falling back to the backup if the response
     * is invalid (Error.TypeCode == '422') in live mode.
     * @param {string} Mode - Required. Values are "1", "2", or "3". Specifies the validation mode (1: USPS datasets, 2: non-USPS datasets, 3: name/phone-assisted).
     * @param {string} Address1 - Required. The primary address line or single-line address.
     * @param {string} [Address2] - Optional. The secondary address line (e.g., suite or apartment number).
     * @param {string} [City] - The city of the address. Required if ZIP is not provided.
     * @param {string} [State] - The state of the address. Required if ZIP is not provided.
     * @param {string} [ZIP] - The ZIP code of the address. Required if City and State are not provided.
     * @param {string} [BusinessName] - Optional. Company name for business addresses, may append SuiteLink data.
     * @param {string} [FirstName] - Optional. First name of the contact, used in Mode 3.
     * @param {string} [MiddleName] - Optional. Middle name of the contact, used in Mode 3.
     * @param {string} [LastName] - Optional. Last name of the contact, used in Mode 3.
     * @param {string} [PhoneNumber] - Optional. Phone number for the contact, enables features like PhoneLink.
     * @param {string} [Options] - Optional. Reserved for future use.
     * @param {string} AuthID - Required. Authentication ID provided by Service Objects.
     * @param {boolean} [isLive=true] - Option to use live service (true) or trial service (false).
     * @param {number} [timeoutSeconds=15] - Timeout in seconds for the HTTP request.
     * @returns {Promise<AV4Response>} A promise that resolves to an AV4Response object with validated address details or an error.
     */
    async invokeAsync(Mode, Address1, Address2, City, State, ZIP,BusinessName, FirstName, MiddleName, LastName,
        PhoneNumber, Options, AuthID, isLive = true, timeoutSeconds = 15) {
        const params = {
            Mode,Address1, Address2, City, State,ZIP, BusinessName, FirstName, MiddleName, LastName,
            PhoneNumber, Options, AuthID
        };

        const url = buildUrl(params, isLive ? LiveBaseUrl : TrialBaseUrl);
        let response = await httpGet(url, timeoutSeconds);
        
        if (isLive && !isValid(response)) {
            const fallbackUrl = buildUrl(params, BackupBaseUrl);
            const fallbackResponse = await httpGet(fallbackUrl, timeoutSeconds);
            return fallbackResponse;
        }

        return response;
    },

    /**
     * Synchronously invokes the ValidateAddress API endpoint by wrapping the async call
     * and awaiting its result immediately. Note: This method should be used cautiously
     * in Node.js as it blocks the event loop.
     * @param {string} Mode - Required. Values are "1", "2", or "3". Specifies the validation mode (1: USPS datasets, 2: non-USPS datasets, 3: name/phone-assisted).
     * @param {string} Address1 - Required. The primary address line or single-line address.
     * @param {string} [Address2] - Optional. The secondary address line (e.g., suite or apartment number).
     * @param {string} [City] - The city of the address. Required if ZIP is not provided.
     * @param {string} [State] - The state of the address. Required if ZIP is not provided.
     * @param {string} [ZIP] - The ZIP code of the address. Required if City and State are not provided.
     * @param {string} [BusinessName] - Optional. Company name for business addresses, may append SuiteLink data.
     * @param {string} [FirstName] - Optional. First name of the contact, used in Mode 3.
     * @param {string} [MiddleName] - Optional. Middle name of the contact, used in Mode 3.
     * @param {string} [LastName] - Optional. Last name of the contact, used in Mode 3.
     * @param {string} [PhoneNumber] - Optional. Phone number for the contact, enables features like PhoneLink.
     * @param {string} [Options] - Optional. Reserved for future use.
     * @param {string} AuthID - Required. Authentication ID provided by Service Objects.
     * * @param {boolean} [isLive=true] - Option to use live service (true) or trial service (false).
     * @param {number} [timeoutSeconds=15] - Timeout in seconds for the HTTP request.
     * @returns {AV4Response} An AV4Response object with validated address details or an error.
     */
    invoke(Mode, Address1, Address2, City, State, ZIP, BusinessName, FirstName, MiddleName, LastName,
        PhoneNumber, Options, AuthID, isLive = true, timeoutSeconds = 15) {
        return (async () => await this.invokeAsync(
            Mode, Address1, Address2, City, State, ZIP, BusinessName, FirstName, MiddleName, LastName,
            PhoneNumber, Options, AuthID, isLive, timeoutSeconds
        ))();
    }
};

export { ValidateAddressClient, AV4Response };