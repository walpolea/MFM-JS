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
    { col: 0, row: -2 },
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

  //directions as gridcoords, good for cartesian-based traversal of event window
  static GC_WEST: GridCoord = EventWindow.WINDOW_ORDER_OFFSETS[1];
  static GC_NORTH: GridCoord = EventWindow.WINDOW_ORDER_OFFSETS[2];
  static GC_SOUTH: GridCoord = EventWindow.WINDOW_ORDER_OFFSETS[3];
  static GC_EAST: GridCoord = EventWindow.WINDOW_ORDER_OFFSETS[4];
  static GC_NW: GridCoord = EventWindow.WINDOW_ORDER_OFFSETS[5];
  static GC_SW: GridCoord = EventWindow.WINDOW_ORDER_OFFSETS[6];
  static GC_NE: GridCoord = EventWindow.WINDOW_ORDER_OFFSETS[7];
  static GC_SE: GridCoord = EventWindow.WINDOW_ORDER_OFFSETS[8];

  //index-based EW maps
  static ORIGIN: number[] = [0];
  static WEST: number[] = [1];
  static NORTH: number[] = [2];
  static SOUTH: number[] = [3];
  static EAST: number[] = [4];
  static NW: number[] = [5];
  static SW: number[] = [6];
  static NE: number[] = [7];
  static SE: number[] = [8];

  static ADJACENT4WAY: number[] = [1, 2, 3, 4];
  static ADJACENT8WAY: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  static LAYER1: number[] = [1, 2, 3, 4];
  static LAYER2: number[] = [5, 6, 7, 8, 9, 10, 11, 12];
  static LAYER3: number[] = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  static LAYER4: number[] = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

  static NORTHERN_HEMISPHERE: number[] = [2, 5, 7, 10, 13, 15, 17, 19, 22, 25, 27, 29, 31, 33, 35, 38];
  static SOUTHERN_HEMISPHERE: number[] = [3, 6, 8, 11, 14, 16, 18, 20, 23, 26, 28, 30, 32, 34, 36, 39];
  static EASTERN_HEMISPHERE: number[] = [4, 7, 8, 12, 17, 18, 19, 20, 24, 27, 28, 33, 34, 35, 36, 40];
  static WESTERN_HEMISPHERE: number[] = [1, 5, 6, 9, 13, 14, 15, 16, 21, 25, 26, 29, 30, 31, 32, 37];
  static EQUATOR: number[] = [0, 1, 4, 9, 12, 21, 24, 37, 40];
  static PRIME_MERIDIAN: number[] = [0, 2, 3, 10, 11, 22, 23, 38, 39];

  static ALL: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
  static ALLADJACENT: number[] = [1, 2, 3, 4, 5, 6, 8, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
  static OPPOSITES: number[] = [0, 4, 3, 2, 1, 8, 7, 6, 5, 12, 11, 10, 9, 20, 19, 18, 17, 16, 15, 14, 13, 24, 23, 22, 21, 28, 27, 26, 25, 36, 35, 34, 33, 32, 31, 30, 29, 40, 39, 38, 37];

  static SUBSETS: Map<string, number[]> = new Map<string, number[]>()
    .set("4way", EventWindow.ADJACENT4WAY)
    .set("8way", EventWindow.ADJACENT8WAY)
    .set("all", EventWindow.ALL);

  tile: Tile;
  origin: Site;
  window: Map<string, Site>; //map gridcoord ID to EW Site
  windowArray: Array<Site>; //indexed array of EW Sites

  constructor(_tile: Tile, _origin: GridCoord) {
    this.makeWindow(_tile, _origin);
  }

  private makeWindow(tile: Tile, origin: GridCoord) {
    this.origin = tile.getSiteByCoord(origin);
    //if the origin is EMPTY Element, let's save some cycles (good, bad?) - bad if you want empty's age.
    if (this.origin.atom.type === ElementTypes.EMPTY) {
      return;
    }

    this.window = new Map<string, Site>();
    this.tile = tile;

    //use event window template offsets to build the rest of the event window
    let offset: GridCoord;
    let site: Site;

    for (let i = 0; i < EventWindow.WINDOW_ORDER_OFFSETS.length; i++) {
      offset = EventWindow.WINDOW_ORDER_OFFSETS[i];
      site = tile.getSiteByCoord(this.OffsetFromOrigin(origin, offset));

      this.window.set(MFMUtils.CtoID(offset), site);
    }

    this.windowArray = Array.from(this.window.values());

  }

  private OffsetFromOrigin(origin: GridCoord, offset: GridCoord): GridCoord {
    return { row: origin.row + offset.row, col: origin.col + offset.col };
  }

  //get site by specific window index
  getSiteByIndex(index: number): Site {
    return index >= this.windowArray.length || index < 0 ? undefined : this.windowArray[index];
  }

  //get the site index by gridcoord offset { row: 1, col: 1} = 8
  getIndexByOffset(offset: GridCoord): number {
    //console.log(offset);
    return EventWindow.WINDOW_ORDER_OFFSETS.findIndex(gc => {
      return (gc.col === offset.col && gc.row === offset.row);
    });
  }

  //get the site offset gridcoord by index
  getOffsetByIndex(index: number): GridCoord {
    return EventWindow.WINDOW_ORDER_OFFSETS[index];
  }

  ////////////////////
  //When you have the need to tell a non-origin site what its offset to another non-origin site is.
  //Like, if origin (who has the EW) needs to tell its index 7 where its index 3 is relative to 7's position
  //useful for linked-list manipulation, hopefully other things too.
  getRelativeIndexFromSiteToSite(fromSite: number, toSite: number): number {

    const fromOffset: GridCoord = EventWindow.WINDOW_ORDER_OFFSETS[fromSite];
    const toOffset: GridCoord = EventWindow.WINDOW_ORDER_OFFSETS[toSite];

    if (!fromOffset || !toOffset) {
      return undefined; //not enough to work with here
    }

    //may return -1 if the fromSite is too far from the toSite (outside of its possible Event Window scope)
    //this is helpful because if you want to make sure elements stay within range of each other you can choose to not act
    const newIndex: number = this.getIndexByOffset(this.getRelativeOffsetFromSiteToSite(fromOffset, toOffset));

    return newIndex === -1 ? undefined : newIndex;
  }

  getRelativeOffsetFromSiteToSite(fromSiteOffset: GridCoord, toSiteOffset: GridCoord): GridCoord {
    const xdist: number = toSiteOffset.col - fromSiteOffset.col;
    const ydist: number = toSiteOffset.row - fromSiteOffset.row;

    return { col: xdist, row: ydist };
  }
  ////////////////////

  //returns a number[] of values intersecting two number[]
  //good for dynamic EW sets, like sites on LAYER1 that are also in NORTHERM_HEMISPHERE
  getIntersection(siteSet1: number[], siteSet2: number[]): number[] {
    return siteSet1.filter(value => -1 !== siteSet2.indexOf(value));
  }

  getExclusion(siteSet: number[], exclusionSet: number[]): number[] {
    return siteSet.filter(value => -1 === exclusionSet.indexOf(value));
  }

  ///////////////////////////////
  ///////GETTING SITE SETS///////
  ///////////////////////////////

  //return all window sites (of type)
  getAll(specificType: IElementType = undefined): Site[] {
    if (specificType) {
      return this.windowArray.filter(site => {
        if (site && site.atom.type === specificType) {
          return true;
        } else {
          return false;
        }
      });
    }

    return this.windowArray;
  }

  //get 1 random site (of type)
  getRandom(specificType: IElementType = undefined): Site {
    return this.getRandomSite(this.getAll(specificType));
  }

  //most useful when using specificType
  //traverses the window until it comes across what you're looking for
  getNearest(specificType: IElementType = undefined): Site {
    return this.getNearestSite(this.getAll(specificType));
  }

  //Major Common Direction Proxys
  getEast(): Site {
    return this.getDirection(EventWindow.GC_EAST);
  }
  getWest(): Site {
    return this.getDirection(EventWindow.GC_WEST);
  }
  getNorth(): Site {
    return this.getDirection(EventWindow.GC_NORTH);
  }
  getSouth(): Site {
    return this.getDirection(EventWindow.GC_SOUTH);
  }
  getNorthWest(): Site {
    return this.getDirection(EventWindow.GC_NW);
  }
  getSouthWest(): Site {
    return this.getDirection(EventWindow.GC_SW);
  }
  getNorthEast(): Site {
    return this.getDirection(EventWindow.GC_NE);
  }
  getSouthEast(): Site {
    return this.getDirection(EventWindow.GC_SE);
  }

  //get random site (of type) in Adjacent 4-way subset
  getAdjacent4Way(specificType: IElementType = undefined): Site {
    return this.getSites(EventWindow.ADJACENT4WAY, specificType, true)[0];
  }

  //get random site (of type) in Adjacent 8-way subset
  getAdjacent8Way(specificType: IElementType = undefined): Site {
    return this.getSites(EventWindow.ADJACENT8WAY, specificType, true)[0];
  }

  //Given an index-based subset of the event window
  //give me back sites (of type) (or one random)
  getSites(subset: number[], type: IElementType = undefined, oneRandom: boolean = true): Site[] {
    let candidates: Site[] = this.getSubset(subset);

    //proxy for getSubset I guess
    if (!type && !oneRandom) {
      return candidates;
    }

    //filter by type
    if (type) {
      candidates = this.filterSitesByType(candidates, type);
    }

    //return array of just 1 random site from filtered
    if (oneRandom) {
      return [this.getRandomSite(candidates)];
    }

    return candidates;
  }

  //get a subset of sites from the event window, subset defined as array of indexes
  getSubset(subset: number[]): Site[] {
    return subset.map(index => {
      if (this.windowArray[index]) {
        return this.windowArray[index];
      }
    });
  }

  //gridcoord way to access directions
  getDirection(direction: GridCoord): Site {
    const d: string = MFMUtils.CtoID(direction);
    return this.window.get(d);
  }

  //return array of sites from site array that match type
  private filterSitesByType(sites: Site[], type: IElementType): Site[] {
    return sites.filter(site => {
      if (site && site.atom.type === type) {
        return true;
      }

      return false;
    });
  }

  //return single random site given site array
  getRandomSite(sites: Site[]): Site {
    return sites[(Math.random() * sites.length) >> 0];
  }

  //return site with lowest index (nearest to origin)
  getNearestSite(sites: Site[]): Site {
    return sites[0];
  }

  //return site with highest index (farthest from origin)
  getFarthestSite(sites: Site[]): Site {
    return sites[sites.length - 1];
  }

  windowCompare(compareMap: Map<number, IElementType>): boolean {

    let matchCount: number = 0;
    let isMatch = false;

    compareMap.forEach((elType, key) => {

      //for now the edges don't count
      if (!this.windowArray[key]) {
        matchCount++;
      }

      if (this.windowArray[key] && elType === this.windowArray[key].atom.type) {

        matchCount++;
      }
    });


    if (matchCount === compareMap.size) {
      isMatch = true;
    }

    return isMatch;
  }

  windowNotCompare(compareMap: Map<number, IElementType>): boolean {

    let matchCount: number = 0;
    let isMatch = false;

    compareMap.forEach((elType, key) => {

      //for now the edges don't count
      if (!this.windowArray[key]) {
        matchCount++;
      }

      if (this.windowArray[key] && elType !== this.windowArray[key].atom.type) {
        matchCount++;
      }
    });

    if (matchCount === compareMap.size) {
      isMatch = true;
    }

    return isMatch;
  }
}
