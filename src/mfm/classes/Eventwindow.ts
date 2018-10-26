import { GridCoord } from "../interfaces/IGridCoord";
import { Tile } from "./Tile";
import { MFMUtils } from "../utils/utils";
import { Site } from "./Site";
import { IElementType, ElementTypes } from "./ElementTypes";

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

    //if the origin is EMPTY Element, let's save some cycles (good, bad?)
    if (this.origin.atom.type === ElementTypes.EMPTY) return;

    this.window.set(this.origin.id, this.origin);

    let windowArray = EventWindow.WINDOW_ORDER_OFFSETS.map((offset: GridCoord) => {
      return this.OffsetFromOrigin(origin, offset.row, offset.col);
    });

    windowArray.forEach((tileCoord: GridCoord) => {
      let site = tile.getSiteByCoord(tileCoord);
      if (site) {
        this.window.set(site.id, site);
      }
    });
  }

  private OffsetFromOrigin(origin: GridCoord, rowOffset: number, colOffset: number): GridCoord {
    return { row: origin.row + rowOffset, col: origin.col + colOffset };
  }

  getRandom(specificType: IElementType = undefined): Site {
    return this.getSiteFromCandidates(Array.from(this.window.values()), true, specificType);
  }

  //most useful when using specificType
  //traverses the window until it comes across what you're looking for
  getNearest(specificType: IElementType = undefined): Site {
    return this.getSiteFromCandidates(Array.from(this.window.values()), false, specificType);
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

  getAdjacent4Way(randomize: boolean = true, specificType: IElementType = undefined): Site {
    return this.getSiteFromCandidates(
      [this.getWest(), this.getNorth(), this.getSouth(), this.getEast()],
      randomize,
      specificType
    );
  }

  getAdjacent8Way(randomize: boolean = true, specificType: IElementType = undefined): Site {
    return this.getSiteFromCandidates(
      [
        this.getWest(),
        this.getNorth(),
        this.getSouth(),
        this.getEast(),
        this.getNorthWest(),
        this.getSouthWest(),
        this.getNorthEast(),
        this.getSouthEast()
      ],
      randomize,
      specificType
    );
  }

  //Given an array of candidate sites (symmetries in the future I hope),
  //give me back one, random by default, not filtered by type by default
  getSiteFromCandidates(
    candidateSites: Array<Site>,
    randomize: boolean = true,
    specificType: IElementType = undefined
  ): Site {
    candidateSites = candidateSites.filter(site => {
      if (!site) return false;

      if (!specificType) {
        return site;
      } else if (specificType && site.atom.type === specificType) {
        return site;
      }

      return false;
    });

    //no sites! yikes! possible!?! probably only when using specificType and looking for a rare element
    if (candidateSites.length < 1) {
      return undefined;
    }

    //return random
    if (randomize) {
      return candidateSites[(Math.random() * candidateSites.length) >> 0];
    }

    //return first matching
    return candidateSites[0];
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
