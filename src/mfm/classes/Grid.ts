import { Tile } from "./Tile";

export class Grid {
  width: number;
  height: number;
  tiles: Tile[];

  constructor(_width: number = 1, _height: number = 1) {
    this.width = _width;
    this.height = _height;

    this.create();
  }

  create() {
    this.tiles = new Array<Tile>();

    for (let i: number = 0; i < this.width; i++) {
      //across columns
      for (let j: number = 0; j < this.height; j++) {
        //down rows
        this.tiles.push(new Tile({ row: j, col: i }));
      }
    }
  }
}
