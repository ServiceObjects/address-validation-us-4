export class AddressInfo {
    constructor(data = {}) {
        this.rating = data.rating || null;
        this.validationType = data.validationType || null;
        this.address = data.address || null;
        this.addressExtra = data.addressExtra || null;
        this.city = data.city || null;
        this.state = data.state || null;
        this.zip = data.zip || null;
        this.countyName = data.countyName || null;
        this.primaryNumber = data.primaryNumber || null;
        this.preDirectional = data.preDirectional || null;
        this.postDirectional = data.postDirectional || null;
        this.streetName = data.streetName || null;
        this.streetSuffix = data.streetSuffix || null;
        this.secondaryType = data.secondaryType || null;
        this.secondaryNumber = data.secondaryNumber || null;
        this.pmbType = data.pmbType || null;
        this.pmbNumber = data.pmbNumber || null;
        this.barcodeDigits = data.barcodeDigits || null;
        this.carrierRoute = data.carrierRoute || null;
        this.congressCode = data.congressCode || null;
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
        this.address = data.address || null;
        this.addressExtra = data.addressExtra || null;
        this.city = data.city || null;
        this.state = data.state || null;
        this.zip = data.zip || null;
        this.primaryNumber = data.primaryNumber || null;
        this.preDirectional = data.preDirectional || null;
        this.postDirectional = data.postDirectional || null;
        this.streetName = data.streetName || null;
        this.streetSuffix = data.streetSuffix || null;
        this.secondaryType = data.secondaryType || null;
        this.secondaryNumber = data.secondaryNumber || null;
        this.phoneNumber = data.phoneNumber || null;
        this.firstName = data.firstName || null;
        this.middleName = data.middleName || null;
        this.lastName = data.lastName || null;
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
        this.title = title;
        this.status = status;
        this.detail = detail;
    }

    toString() {
        return `Title: ${this.title} Status: ${this.status} Detail: ${this.detail}`;
    }
}

export class AV4Response {
    constructor(data = {}) {
        this.Status = data.status || null;
        this.Addresses = (data.addresses  || []).map(addr => new AddressInfo(addr));
        this.ParsedInput = data.parsedInput ? new ParsedInputInfo(data.parsedInput) : null;
         this.ProblemDetails = data.ProblemDetails
            ? new ProblemDetails(
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