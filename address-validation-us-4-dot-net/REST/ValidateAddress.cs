using System;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;

namespace address_validation_us_4_dot_net.REST
{
    /// <summary>
    /// Provides functionality to call the ServiceObjects AV4 REST API's ValidateAddress endpoint.
    /// Retrieves parsed and validated address elements including Delivery Point Validation (DPV),
    /// Residential Delivery Indicator (RDI), and Suite data with fallback to a backup endpoint for reliability in live mode.
    /// </summary>
    public class ValidateAddressClient
    {
        private const string LiveBaseUrl = "https://strial.serviceobjects.com/AV4/";
        private const string BackupBaseUrl = "https://strialbackup.serviceobjects.com/AV4/";
        private const string TrialBaseUrl = "https://trial.serviceobjects.com/AV4/";

        /// <summary>
        /// Synchronously calls the ValidateAddress REST endpoint to retrieve validated address information.
        /// Validates input parameters and returns an AV4Response with an Error object if validation fails.
        /// Attempts the primary endpoint first, falling back to the backup if the response is invalid (Error.Status == "500") in live mode.
        /// </summary>
        /// <param name="input">The input parameters including address components, mode, and authentication details.</param>
        /// <returns>Deserialized <see cref="AV4Response"/> containing validated address details or an error if validation fails.</returns>
        public static AV4ResponseWrapper Invoke(ValidateAddressInput input)
        {

            // Build URL with query string parameters to avoid issues with missing/optional fields
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrialBaseUrl);
            string jsonResponse = Helper.HttpGet(url, input.TimeoutSeconds);
            bool IsValid = true;
            AV4ResponseWrapper response = new();
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            if (jsonResponse.Replace(" ", "").Contains("\"status\":4"))
            {
                response.ProblemDetails = JsonSerializer.Deserialize<ProblemDetails>(jsonResponse, options);
            }
            else if (jsonResponse.Replace(" ", "").Contains("\"status\":5"))
            {
                IsValid = false;
            }
            else
            {
                response.ValidateAddressResponse = JsonSerializer.Deserialize<ValidateAddressResponse>(jsonResponse, options);
            }
            // Fallback on error in live mode 
            if (input.IsLive && !IsValid)
            {
                string fallbackUrl = BuildUrl(input, BackupBaseUrl);
                string fallbackJsonResponse = Helper.HttpGet(fallbackUrl, input.TimeoutSeconds);
                response = new();
                if (fallbackJsonResponse.Replace(" ", "").Contains("\"status\":4") || fallbackJsonResponse.Replace(" ", "").Contains("\"status\":5"))
                {
                    response.ProblemDetails = JsonSerializer.Deserialize<ProblemDetails>(jsonResponse, options);
                }
                else
                {
                    response.ValidateAddressResponse = JsonSerializer.Deserialize<ValidateAddressResponse>(jsonResponse, options);
                }
                return response;
            }
            return response;
        }

        /// <summary>
        /// Asynchronously calls the ValidateAddress REST endpoint to retrieve validated address information.
        /// Validates input parameters and returns an AV4Response with an Error object if validation fails.
        /// Attempts the primary endpoint first, falling back to the backup if the response is invalid (Error.Status == "500") in live mode.
        /// </summary>
        /// <param name="input">The input parameters including address components, mode, and authentication details.</param>
        /// <returns>Deserialized <see cref="AV4Response"/> containing validated address details or an error if validation fails.</returns>
        public static async Task<AV4ResponseWrapper> InvokeAsync(ValidateAddressInput input)
        {

            // Build URL with query string parameters to avoid issues with missing/optional fields
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrialBaseUrl);
            string jsonResponse = await Helper.HttpGetAsync(url, input.TimeoutSeconds).ConfigureAwait(false);

            bool IsValid = true;
            AV4ResponseWrapper response = new();
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            if (jsonResponse.Replace(" ", "").Contains("\"status\":4"))
            {
                response.ProblemDetails = JsonSerializer.Deserialize<ProblemDetails>(jsonResponse, options);
            }
            else if (jsonResponse.Replace(" ", "").Contains("\"status\":5"))
            {
                IsValid = false;
            }
            else
            {
                response.ValidateAddressResponse = JsonSerializer.Deserialize<ValidateAddressResponse>(jsonResponse, options);
            }

            if (input.IsLive && !IsValid)
            {
                string fallbackUrl = BuildUrl(input, BackupBaseUrl);
                string fallbackJsonResponse = await Helper.HttpGetAsync(fallbackUrl, input.TimeoutSeconds).ConfigureAwait(false);
                response = new();
                if (fallbackJsonResponse.Replace(" ", "").Contains("\"status\":4") || fallbackJsonResponse.Replace(" ", "").Contains("\"status\":5"))
                {
                    response.ProblemDetails = JsonSerializer.Deserialize<ProblemDetails>(jsonResponse, options);
                }
                else
                {
                    response.ValidateAddressResponse = JsonSerializer.Deserialize<ValidateAddressResponse>(jsonResponse, options);
                }
                return response;
            }

            return response;
        }

        /// <summary>
        /// Builds the full request URL with URL-encoded query string parameters.
        /// </summary>
        /// <param name="input">The input parameters to include in the query string.</param>
        /// <param name="baseUrl">The base URL (live, backup, or trial).</param>
        /// <returns>The complete URL with query string.</returns>
        public static string BuildUrl(ValidateAddressInput input, string baseUrl)
        {
            string qs = $"ValidateAddress?" +
                     $"Mode={Helper.UrlEncode(input.Mode)}" +
                     $"&Address1={Helper.UrlEncode(input.Address1)}" +
                     $"&Address2={Helper.UrlEncode(input.Address2)}" +
                     $"&City={Helper.UrlEncode(input.City)}" +
                     $"&State={Helper.UrlEncode(input.State)}" +
                     $"&ZIP={Helper.UrlEncode(input.ZIP)}" +
                     $"&BusinessName={Helper.UrlEncode(input.BusinessName)}" +
                     $"&FirstName={Helper.UrlEncode(input.FirstName)}" +
                     $"&MiddleName={Helper.UrlEncode(input.MiddleName)}" +
                     $"&LastName={Helper.UrlEncode(input.LastName)}" +
                     $"&PhoneNumber={Helper.UrlEncode(input.PhoneNumber)}" +
                     $"&Options={Helper.UrlEncode(input.Options)}" +
                     $"&AuthID={Helper.UrlEncode(input.AuthID)}";
            return baseUrl + qs;
        }

        /// <summary>
        /// Input parameters for the ValidateAddress operation, which validates an address against a CASS-approved engine
        /// and supplemental data sources depending on the mode.
        /// - Mode 1 uses standard USPS datasets.
        /// - Mode 2 includes aggregated non-USPS datasets.
        /// - Mode 3 enhances validation with name and phone-assisted nudging using proprietary data.
        /// Returns parsed and validated address elements including Delivery Point Validation (DPV), Residential Delivery Indicator (RDI),
        /// and Suite data. In cases of ambiguity, multiple address matches may be returned.
        /// </summary>
        /// <param name="Mode">Required. Values are "1", "2", or "3". Specifies the validation mode.</param>
        /// <param name="Address1">Required. The primary address line or single-line address.</param>
        /// <param name="Address2">Optional. The secondary address line (e.g., suite or apartment number).</param>
        /// <param name="City">The city of the address. Required if ZIP is not provided.</param>
        /// <param name="State">The state of the address. Required if ZIP is not provided.</param>
        /// <param name="ZIP">The ZIP code of the address. Required if City and State are not provided.</param>
        /// <param name="BusinessName">Optional. Company name for business addresses, may append SuiteLink data.</param>
        /// <param name="FirstName">Optional. First name of the contact.</param>
        /// <param name="MiddleName">Optional. Middle name of the contact.</param>
        /// <param name="LastName">Optional. Last name of the contact.</param>
        /// <param name="PhoneNumber">Optional. Phone number for the contact, enables features like PhoneLink.</param>
        /// <param name="Options">Optional. Reserved for future use.</param>
        /// <param name="AuthID">Required. Authentication ID provided by Service Objects.</param>
        /// <param name="IsLive">Optional. True for live service, false for trial service. Defaults to true.</param>
        /// <param name="TimeoutSeconds">Optional. Timeout for the HTTP request in seconds. Defaults to 15.</param>
        public record ValidateAddressInput(
            string Mode = "",
            string Address1 = "",
            string Address2 = "",
            string City = "",
            string State = "",
            string ZIP = "",
            string BusinessName = "",
            string FirstName = "",
            string MiddleName = "",
            string LastName = "",
            string PhoneNumber = "",
            string Options = "",
            string AuthID = "",
            bool IsLive = true,
            int TimeoutSeconds = 15
        );
    }
}