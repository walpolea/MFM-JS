import { GridCoord } from "../interfaces/IGridCoord";
import { Atom } from "./Atom";
import { Tile } from "./Tile";
import { MFMUtils } from "../utils/utils";

export class EventWindow {
  static WINDOW_ORDER_OFFSETS: Array<GridCoord> = [
    { col: 0, row: 0 },
    { col: -1, row: 0 },
    { col: 0, row: -1 },
    { col: 0, row: 1 },
    { col: 1, row: 0 },
    { col: -1, row: -1 },
    { col: -1, row: 1 },
    { col: 1, row: -1 },
    { col: 1, row: 1 },
    { col: -2, row: 0 },
    { col: 0, row: -1 },
    { col: 0, row: 2 },
    { col: 2, row: 0 },
    { col: -2, row: -1 },
    { col: -2, row: 1 },
    { col: -1, row: -2 },
    { col: -1, row: 2 },
    { col: 1, row: -2 },
    { col: 1, row: 2 },
    { col: 2, row: -1 },
    { col: 2, row: 1 },
    { col: -3, row: 0 },
    { col: 0, row: -3 },
    { col: 0, row: 3 },
    { col: 3, row: 0 },
    { col: -2, row: -2 },
    { col: -2, row: 2 },
    { col: 2, row: -2 },
    { col: 2, row: 2 },
    { col: -3, row: -1 },
    { col: -3, row: 1 },
    { col: -1, row: -3 },
    { col: -1, row: 3 },
    { col: 1, row: -3 },
    { col: 1, row: 3 },
    { col: 3, row: -1 },
    { col: 3, row: 1 },
    { col: -4, row: 0 },
    { col: 0, row: -4 },
    { col: 0, row: 4 },
    { col: 4, row: 0 }
  ];

  static EW_WEST: GridCoord = { col: -1, row: 0 };
  static EW_EAST: GridCoord = { col: 1, row: 0 };
  static EW_NORTH: GridCoord = { col: 0, row: -1 };
  static EW_SOUTH: GridCoord = { col: 0, row: 1 };

  tile: Tile;
  origin: Atom;
  window: Map<string, Atom>;
  windowArray: Atom[] = new Array<Atom>(24);

  constructor(_tile: Tile, _origin: GridCoord) {
    this.tile = _tile;
    this.makeWindow(_tile, _origin);
  }

  private makeWindow(tile: Tile, origin: GridCoord) {
    this.window = new Map<string, Atom>();
    this.origin = this.tile.getSiteByCoord(origin).atom;

    this.window.set(MFMUtils.CtoID(origin), this.origin);

    let windowArray = EventWindow.WINDOW_ORDER_OFFSETS.map((offset: GridCoord) => {
      return this.OffsetFromOrigin(origin, offset.row, offset.col);
    });

    windowArray.forEach((tileCoord: GridCoord) => {
      if (tile.getSiteByCoord(tileCoord)) {
        this.window.set(MFMUtils.CtoID(tileCoord), tile.getSiteByCoord(tileCoord).atom);
      }
    });
  }

  private OffsetFromOrigin(origin: GridCoord, rowOffset: number, colOffset: number): GridCoord {
    return { row: origin.row + rowOffset, col: origin.col + colOffset };
  }

  getRandom(): Atom {
    let items = Array.from(this.window.values());
    let ri: number = Math.floor(Math.random() * items.length);
    return items[ri];
  }

  getEast(): Atom {
    return this.getDirection(EventWindow.EW_EAST);
  }

  getWest(): Atom {
    return this.getDirection(EventWindow.EW_WEST);
  }

  getNorth(): Atom {
    return this.getDirection(EventWindow.EW_NORTH);
  }

  getSouth(): Atom {
    return this.getDirection(EventWindow.EW_SOUTH);
  }

  getDirection(direction: GridCoord) {
    let site = this.tile.sites.get(
      MFMUtils.CtoID(this.OffsetFromOrigin(this.origin.sitePos, direction.row, direction.col))
    );

    if (site) {
      return site.atom;
    }

    return undefined;
  }
}
