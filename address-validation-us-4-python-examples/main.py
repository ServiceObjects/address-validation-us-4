from address_validation_us_4_rest_sdk_example import validate_address_sdk_go

if __name__ == "__main__":  
  # Your license key from Service Objects.  
  # Trial license keys will only work on the trial environments and production  
  # license keys will only work on production environments.  
  license_key = "LICENSE KEY"  
  is_live = False

  # Address Validation US 4 - ValidateAddressInput - REST SDK
  validate_address_sdk_go(is_live, license_key)
