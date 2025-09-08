import {validateAddressGO} from "./validate_address_4_rest_sdk_example.js";

async function main() {
  //Your license key from Service Objects.
  //Trial license keys will only work on the
  //trail environments and production license
  //keys will only work on production environments.
  const licenseKey = "LICENSE KEY";
  const isLive = false;

  //Address Validation US 4 - AV4Response - REST SDK
  validateAddressGO(licenseKey, isLive);
}
main().catch((error) => {
  console.error("An error occurred:", error);
});
