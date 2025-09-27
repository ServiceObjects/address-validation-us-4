export class AddressInfo {
    constructor(data = {}) {
        this.rating = data.rating;
        this.validationType = data.validationType;
        this.address = data.address;
        this.addressExtra = data.addressExtra;
        this.city = data.city;
        this.state = data.state;
        this.zip = data.zip;
        this.countyName = data.countyName;
        this.primaryNumber = data.primaryNumber;
        this.preDirectional = data.preDirectional;
        this.postDirectional = data.postDirectional;
        this.streetName = data.streetName;
        this.streetSuffix = data.streetSuffix;
        this.secondaryType = data.secondaryType;
        this.secondaryNumber = data.secondaryNumber;
        this.pmbType = data.pmbType;
        this.pmbNumber = data.pmbNumber;
        this.barcodeDigits = data.barcodeDigits;
        this.carrierRoute = data.carrierRoute;
        this.congressCode = data.congressCode;
        this.addressNotes = data.addressNotes || [];
    }

    toString() {
        const addressNotesString = this.addressNotes.length 
            ? this.addressNotes.join(', ') 
            : 'null';
        return `AddressInfo: rating=${this.rating}, validationType=${this.validationType}, ` +
               `address=${this.address}, addressExtra=${this.addressExtra}, city=${this.city}, ` +
               `state=${this.state}, zip=${this.zip}, countyName=${this.countyName}, ` +
               `primaryNumber=${this.primaryNumber}, preDirectional=${this.preDirectional}, ` +
               `postDirectional=${this.postDirectional}, streetName=${this.streetName}, ` +
               `streetSuffix=${this.streetSuffix}, secondaryType=${this.secondaryType}, ` +
               `secondaryNumber=${this.secondaryNumber}, pmbType=${this.pmbType}, ` +
               `pmbNumber=${this.pmbNumber}, barcodeDigits=${this.barcodeDigits}, ` +
               `carrierRoute=${this.carrierRoute}, congressCode=${this.congressCode}, ` +
               `addressNotes=[${addressNotesString}]`;
    }
}

export class ParsedInputInfo {
    constructor(data = {}) {
        this.address = data.address;
        this.addressExtra = data.addressExtra;
        this.city = data.city;
        this.state = data.state;
        this.zip = data.zip;
        this.primaryNumber = data.primaryNumber;
        this.preDirectional = data.preDirectional;
        this.postDirectional = data.postDirectional;
        this.streetName = data.streetName;
        this.streetSuffix = data.streetSuffix;
        this.secondaryType = data.secondaryType;
        this.secondaryNumber = data.secondaryNumber;
        this.phoneNumber = data.phoneNumber;
        this.firstName = data.firstName;
        this.middleName = data.middleName;
        this.lastName = data.lastName;
    }

    toString() {
        return `ParsedInputInfo: address=${this.address}, addressExtra=${this.addressExtra}, ` +
               `city=${this.city}, state=${this.state}, zip=${this.zip}, ` +
               `primaryNumber=${this.primaryNumber}, preDirectional=${this.preDirectional}, ` +
               `postDirectional=${this.postDirectional}, streetName=${this.streetName}, ` +
               `streetSuffix=${this.streetSuffix}, secondaryType=${this.secondaryType}, ` +
               `secondaryNumber=${this.secondaryNumber}, phoneNumber=${this.phoneNumber}, ` +
               `firstName=${this.firstName}, middleName=${this.middleName}, lastName=${this.lastName}`;
    }
}

export class ProblemDetails {
    constructor({ type = null, title = null, status = null, detail = null } = {}) {
        this.type = type;
        this.title = title;
        this.status = status;
        this.detail = detail;
    }

    toString() {
        return `Type: ${this.type} Title: ${this.title} Status: ${this.status} Detail: ${this.detail}`;
    }
}

export class AV4Response {
    constructor(data = {}) {
        this.Status = data.status;
        this.Addresses = (data.addresses  || []).map(addr => new AddressInfo(addr));
        this.ParsedInput = data.parsedInput ? new ParsedInputInfo(data.parsedInput) : null;
        this.ProblemDetails = data.ProblemDetails
            ? new ProblemDetails(
                data.ProblemDetails.Type,
                data.ProblemDetails.Title,
                data.ProblemDetails.Status,
                data.ProblemDetails.Detail
              )
            : null;
    }

    toString() {
        const addressesString = this.addresses.length 
            ? this.addresses.map(addr => addr.toString()).join(', ') 
            : 'null';
        return `ValidateAddressResponse:\nStatus: ${this.status}\nAddresses: ${addressesString}\nParsedInput: ${this.parsedInput ? this.parsedInput.toString() : 'null'}\nProblemDetails: ${this.problemDetails ? this.problemDetails.toString() : 'null'}`;
    }
}

export default AV4Response;