"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IceCream {
    constructor(iceballs, container, topping) {
        this._iceballs = iceballs;
        this._container = container;
        this._topping = topping;
    }
    get iceballs() {
        return this._iceballs;
    }
    set iceballs(value) {
        this._iceballs = value;
    }
    get container() {
        return this._container;
    }
    set container(value) {
        this._container = value;
    }
    get topping() {
        return this._topping;
    }
    set topping(value) {
        this._topping = value;
    }
}
exports.IceCream = IceCream;
//# sourceMappingURL=IceCream.js.map