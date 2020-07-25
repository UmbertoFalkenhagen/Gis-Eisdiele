"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PersonalData {
    constructor(lastName, firstName, phone, address) {
        this._lastName = lastName;
        this._firstName = firstName;
        this._phone = phone;
        this._address = address;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }
    get phone() {
        return this._phone;
    }
    set phone(value) {
        this._phone = value;
    }
    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }
}
exports.PersonalData = PersonalData;
//# sourceMappingURL=PersonalData.js.map