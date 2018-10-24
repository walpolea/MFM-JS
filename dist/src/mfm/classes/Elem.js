export class Elem {
    constructor(_name, _type, _moveable = true, _killable = true, _data = 0) {
        this.name = _name;
        this.type = _type;
        this.data = _data;
        this.moveable = _moveable;
        this.killable = _killable;
    }
    set data(d) {
        this._data = d;
    }
    get data() {
        return this._data;
    }
    set name(n) {
        this._name = n;
    }
    get name() {
        return this._name;
    }
    set type(t) {
        this._type = t;
    }
    get type() {
        return this._type;
    }
    set moveable(m) {
        this._moveable = m;
    }
    get moveable() {
        return this._moveable;
    }
    set killable(k) {
        this._killable = k;
    }
    get killable() {
        return this._killable;
    }
    exec(ew) { }
}
//# sourceMappingURL=Elem.js.map