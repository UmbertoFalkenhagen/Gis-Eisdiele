"use strict";
var shop;
(function (shop) {
    class IceBall {
        constructor(name, color, size) {
            this._name = name;
            this._color = color;
            this._size = size;
        }
        get name() {
            return this._name;
        }
        set name(value) {
            this._name = value;
        }
        get color() {
            return this._color;
        }
        set color(value) {
            this._color = value;
        }
        get size() {
            return this._size;
        }
        set size(value) {
            this._size = value;
        }
        get position() {
            return this._position;
        }
        set position(value) {
            this._position = value;
        }
    }
    shop.IceBall = IceBall;
})(shop || (shop = {}));
//# sourceMappingURL=IceBall.js.map