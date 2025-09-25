import {validateAddressGO} from "./validate_address_4_rest_sdk_example.js";

async function main() {
  //Your auth id from Service Objects.
  //Trial auth id will only work on the
  //trail environments and production auth id
  //will only work on production environments.
  const authId = "LICENSE KEY";
  const isLive = false;

  //Address Validation US 4 - AV4Response - REST SDK
    validateAddressGO(authId, isLive);
}
main().catch((error) => {
  console.error("An error occurred:", error);
});
