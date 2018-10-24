import { Tile } from "./Tile";
import { GridCoord } from "../interfaces/IGridCoord";
import { Site } from "./Site";

export class EventWindow {
  tile: Tile;
  self: Site;
  window: Map<GridCoord, Site>;

  constructor(_tile: Tile, origin: GridCoord) {
    this.tile = _tile;
    this.window = new Map<GridCoord, Site>();
    this.self = this.tile.getSiteByCoord(origin);
    this.window.set(origin, this.self);
  }

  getRandom(): Tile {
    let items = Array.from(this.window.values());
    let ri: number = Math.floor(Math.random() * items.length);
    return items[ri].tile;
  }

  getTile(c: GridCoord): Tile {
    return this.window.get(c).tile;
  }
}
