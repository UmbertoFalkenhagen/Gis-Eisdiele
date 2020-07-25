export class PersonalData {
    private _lastName: string;
    private _firstName: string;
    private _phone: string;
    private _address: string;


    constructor(lastName: string, firstName: string, phone: string, address: string) {
        this._lastName = lastName;
        this._firstName = firstName;
        this._phone = phone;
        this._address = address;
    }


    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get phone(): string {
        return this._phone;
    }

    set phone(value: string) {
        this._phone = value;
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }
}
