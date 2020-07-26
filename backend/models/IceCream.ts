import {IceType} from "./IceType";
import {IceContainer} from "./IceContainer";
import {Topping} from "./Topping";

export class IceCream {
    private _iceballs: Array<IceType>;
    private _container: IceContainer;
    private _topping: Topping;


    constructor(iceballs: Array<IceType>, container: IceContainer, topping: Topping) {
        this._iceballs = iceballs;
        this._container = container;
        this._topping = topping;
    }


    get iceballs(): Array<IceType> {
        return this._iceballs;
    }

    set iceballs(value: Array<IceType>) {
        this._iceballs = value;
    }

    get container(): IceContainer {
        return this._container;
    }

    set container(value: IceContainer) {
        this._container = value;
    }


    get topping(): Topping {
        return this._topping;
    }

    set topping(value: Topping) {
        this._topping = value;
    }
}
