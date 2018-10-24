import { Site } from "./Site";
import { MFMUtils } from "../utils/utils";
export class Tile {
    constructor(_pos, _width = 50, _height = 50) {
        this.gridPos = _pos;
        this.width = _width;
        this.height = _height;
        this.id = MFMUtils.CtoID(this.gridPos);
        this.create();
    }
    getSiteByCoord(c) {
        return;
    }
    create() {
        this.sites = new Map();
        for (let i = 0; i < this.width; i++) {
            //across columns
            for (let j = 0; j < this.height; j++) {
                //down rows
                let gc = { row: j, col: i };
                this.sites.set(gc, new Site(this, gc));
            }
        }
    }
}
//# sourceMappingURL=Tile.js.map