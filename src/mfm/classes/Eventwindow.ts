import { Site } from "./Site";
import { GridCoord } from "../interfaces/IGridCoord";
import { Atom } from "./Atom";
import { Tile } from "./Tile";

export class EventWindow {
  tile: Tile;
  self: Atom;
  window: Map<GridCoord, Atom>;
  windowArray: Atom[];

  constructor(_tile: Tile, origin: GridCoord) {
    this.tile = _tile;
    this.window = new Map<GridCoord, Atom>();
    this.self = this.tile.getSiteByCoord(origin).atom;
    this.window.set(origin, this.self);
    this.windowArray.push(this.self);
  }

  getRandom(): Atom {
    let items = Array.from(this.window.values());
    let ri: number = Math.floor(Math.random() * items.length);
    return items[ri];
  }

  getTile(c: GridCoord): Atom {
    return this.window.get(c);
  }
}
