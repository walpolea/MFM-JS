import { GridCoord } from "../interfaces/IGridCoord";
import { Atom } from "./Atom";
import { Tile } from "./Tile";
import { MFMUtils } from "../utils/utils";
import { Site } from "./Site";
import { IElementType } from "./ElementTypes";

//Event window as describbed here: http://robust.cs.unm.edu/lib/exe/fetch.php?w=300&tok=4c8f49&media=dev:event-window-10.png
//Collection of sites which contain atoms, built from an origin (center) site
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

  //because, lazy
  static EW_WEST: GridCoord = { col: -1, row: 0 };
  static EW_EAST: GridCoord = { col: 1, row: 0 };
  static EW_NORTH: GridCoord = { col: 0, row: -1 };
  static EW_SOUTH: GridCoord = { col: 0, row: 1 };
  static EW_NORTHWEST: GridCoord = { col: -1, row: -1 };
  static EW_SOUTHWEST: GridCoord = { col: -1, row: 1 };
  static EW_NORTHEAST: GridCoord = { col: 1, row: -1 };
  static EW_SOUTHEAST: GridCoord = { col: 1, row: 1 };

  tile: Tile;
  origin: Site;
  window: Map<string, Site>;

  constructor(_tile: Tile, _origin: GridCoord) {
    this.tile = _tile;
    this.makeWindow(_tile, _origin);
  }

  private makeWindow(tile: Tile, origin: GridCoord) {
    this.window = new Map<string, Site>();
    this.origin = this.tile.getSiteByCoord(origin);

    this.window.set(MFMUtils.CtoID(origin), this.origin);

    let windowArray = EventWindow.WINDOW_ORDER_OFFSETS.map((offset: GridCoord) => {
      return this.OffsetFromOrigin(origin, offset.row, offset.col);
    });

    windowArray.forEach((tileCoord: GridCoord) => {
      if (tile.getSiteByCoord(tileCoord)) {
        this.window.set(MFMUtils.CtoID(tileCoord), tile.getSiteByCoord(tileCoord));
      }
    });
  }

  private OffsetFromOrigin(origin: GridCoord, rowOffset: number, colOffset: number): GridCoord {
    return { row: origin.row + rowOffset, col: origin.col + colOffset };
  }

  getRandom(): Site {
    let items = Array.from(this.window.values());
    let ri: number = Math.floor(Math.random() * items.length);
    return items[ri];
  }

  //easy way to get a neighbor that is there
  getAvailableNeighbor(specificType: IElementType = undefined): Site {
    if (!specificType) {
      if (this.getWest()) return this.getWest();
      if (this.getNorth()) return this.getNorth();
      if (this.getSouth()) return this.getSouth();
      if (this.getEast()) return this.getEast();
      if (this.getNorthWest()) return this.getNorthWest();
      if (this.getSouthWest()) return this.getSouthWest();
      if (this.getNorthEast()) return this.getNorthEast();
      if (this.getSouthEast()) return this.getSouthEast();
    } else {
      const check = (s: Site, specificType: IElementType) => {
        if (s && s.atom && s.atom.type == specificType) {
          return s;
        }
        return undefined;
      };

      let s: Site = this.getWest();
      if (check(s, specificType)) {
        return s;
      }

      s = this.getNorth();
      if (check(s, specificType)) {
        return s;
      }

      s = this.getSouth();
      if (check(s, specificType)) {
        return s;
      }

      s = this.getEast();
      if (check(s, specificType)) {
        return s;
      }

      s = this.getNorthWest();
      if (check(s, specificType)) {
        return s;
      }

      s = this.getSouthWest();
      if (check(s, specificType)) {
        return s;
      }

      s = this.getNorthEast();
      if (check(s, specificType)) {
        return s;
      }

      s = this.getSouthEast();
      if (check(s, specificType)) {
        return s;
      }
    }
    return undefined;
  }

  getEast(): Site {
    return this.getDirection(EventWindow.EW_EAST);
  }
  getWest(): Site {
    return this.getDirection(EventWindow.EW_WEST);
  }
  getNorth(): Site {
    return this.getDirection(EventWindow.EW_NORTH);
  }
  getSouth(): Site {
    return this.getDirection(EventWindow.EW_SOUTH);
  }
  getNorthWest(): Site {
    return this.getDirection(EventWindow.EW_NORTHWEST);
  }
  getSouthWest(): Site {
    return this.getDirection(EventWindow.EW_SOUTHWEST);
  }
  getNorthEast(): Site {
    return this.getDirection(EventWindow.EW_NORTHEAST);
  }
  getSouthEast(): Site {
    return this.getDirection(EventWindow.EW_SOUTHEAST);
  }

  getDirection(direction: GridCoord): Site {
    let site = this.tile.sites.get(
      MFMUtils.CtoID(this.OffsetFromOrigin(this.origin.tilePos, direction.row, direction.col))
    );

    if (site) {
      return site;
    }

    return undefined;
  }
}
