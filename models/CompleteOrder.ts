export interface PersonalData {
    _lastName: string;
    _firstName: string;
    _phone: string;
    _address: string;
}

export interface Icecream {
    _iceballs: Array<string>;
    _container: string;
    _topping: string;
}

export interface CompleteOrder {
    _id: string;
    _personalData: PersonalData;
    _icecream: Icecream;
}



