import {PersonalData} from "./PersonalData";
import {IceCream} from "./IceCream";

export class Order {
    private _personalData: PersonalData;
    private _icecream: IceCream;


    constructor(personalData: PersonalData, icecream: IceCream) {
        this._personalData = personalData;
        this._icecream = icecream;
    }


    get personalData(): PersonalData {
        return this._personalData;
    }

    set personalData(value: PersonalData) {
        this._personalData = value;
    }

    get icecream(): IceCream {
        return this._icecream;
    }

    set icecream(value: IceCream) {
        this._icecream = value;
    }
}

