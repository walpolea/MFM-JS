import { Utils } from "../utils/utils";
export class Site {
    constructor(_tile, _pos) {
        this.tile = _tile;
        this.tilePos = _pos;
        this.id = Utils.CtoID(this.tilePos);
    }
}
//# sourceMappingURL=Site.js.map