"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(personalData, icecream) {
        this._personalData = personalData;
        this._icecream = icecream;
    }
    get personalData() {
        return this._personalData;
    }
    set personalData(value) {
        this._personalData = value;
    }
    get icecream() {
        return this._icecream;
    }
    set icecream(value) {
        this._icecream = value;
    }
}
exports.Order = Order;
//# sourceMappingURL=Order.js.map