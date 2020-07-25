namespace shop {

    export class IceBall {
        private _name: string;
        private _color: string;
        private _size: number;
        private _position: number;


        constructor(name: string, color: string, size: number) {
            this._name = name;
            this._color = color;
            this._size = size;
        }

        get name(): string {
            return this._name;
        }

        set name(value: string) {
            this._name = value;
        }

        get color(): string {
            return this._color;
        }

        set color(value: string) {
            this._color = value;
        }

        get size(): number {
            return this._size;
        }

        set size(value: number) {
            this._size = value;
        }


        get position(): number {
            return this._position;
        }

        set position(value: number) {
            this._position = value;
        }
    }
}