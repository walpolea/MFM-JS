export class EventWindow {
    constructor(_tile, origin) {
        this.tile = _tile;
        this.window = new Map();
        this.self = this.tile.getSiteByCoord(origin);
        this.window.set(origin, this.self);
    }
    getRandom() {
        let items = Array.from(this.window.values());
        let ri = Math.floor(Math.random() * items.length);
        return items[ri].tile;
    }
    getTile(c) {
        return this.window.get(c).tile;
    }
}
//# sourceMappingURL=Eventwindow.js.map