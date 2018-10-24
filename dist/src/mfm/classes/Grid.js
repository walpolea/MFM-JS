import { Tile } from "./Tile";
export class Grid {
    constructor(_width = 1, _height = 1) {
        this.width = _width;
        this.height = _height;
        this.create();
    }
    create() {
        this.tiles = new Array();
        for (let i = 0; i < this.width; i++) {
            //across columns
            for (let j = 0; j < this.height; j++) {
                //down rows
                this.tiles.push(new Tile({ row: j, col: i }));
            }
        }
    }
}
//# sourceMappingURL=Grid.js.map