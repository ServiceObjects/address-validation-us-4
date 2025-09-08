from dataclasses import dataclass
from typing import Optional, List

@dataclass
class AddressInfo:
    rating: Optional[str] = None
    validationType: Optional[str] = None
    validationTypeValue: Optional[int] = None
    address: Optional[str] = None
    addressExtra: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip: Optional[str] = None
    countyName: Optional[str] = None
    primaryNumber: Optional[str] = None
    preDirectional: Optional[str] = None
    postDirectional: Optional[str] = None
    streetName: Optional[str] = None
    streetSuffix: Optional[str] = None
    secondaryType: Optional[str] = None
    secondaryNumber: Optional[str] = None
    pmbType: Optional[str] = None
    pmbNumber: Optional[str] = None
    barcodeDigits: Optional[str] = None
    carrierRoute: Optional[str] = None
    congressCode: Optional[str] = None
    addressNotes: Optional[List[str]] = None

@dataclass
class ParsedInputInfo:
    address: Optional[str] = None
    addressExtra: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip: Optional[str] = None
    primaryNumber: Optional[str] = None
    preDirectional: Optional[str] = None
    postDirectional: Optional[str] = None
    streetName: Optional[str] = None
    streetSuffix: Optional[str] = None
    secondaryType: Optional[str] = None
    secondaryNumber: Optional[str] = None
    phoneNumber: Optional[str] = None
    firstName: Optional[str] = None
    middleName: Optional[str] = None
    lastName: Optional[str] = None

@dataclass
class ProblemDetails:
    title: Optional[str] = None
    status: Optional[str] = None
    detail: Optional[str] = None

@dataclass
class AV4Response:
    Status: Optional[str] = None
    Addresses: Optional[List[AddressInfo]] = None
    ParsedInput: Optional[ParsedInputInfo] = None
    ProblemDetails: Optional[ProblemDetails] = None