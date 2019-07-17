import { GridCoord } from "../interfaces/IGridCoord";
import { Tile } from "./Tile";
import { MFMUtils } from "../utils/utils";
import { Site } from "./Site";
import { IElementType, ElementTypes } from "./ElementTypes";
import { Atom } from "./Atom";

//Event window as describbed here: http://robust.cs.unm.edu/lib/exe/fetch.php?w=300&tok=4c8f49&media=dev:event-window-10.png
//Collection of sites which contain atoms, built from an origin (center) site
export class EventWindow {
  static WINDOW_OFFSETS: Array<GridCoord> = [
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
  static GC_WEST: GridCoord = EventWindow.WINDOW_OFFSETS[1];
  static GC_NORTH: GridCoord = EventWindow.WINDOW_OFFSETS[2];
  static GC_SOUTH: GridCoord = EventWindow.WINDOW_OFFSETS[3];
  static GC_EAST: GridCoord = EventWindow.WINDOW_OFFSETS[4];
  static GC_NW: GridCoord = EventWindow.WINDOW_OFFSETS[5];
  static GC_SW: GridCoord = EventWindow.WINDOW_OFFSETS[6];
  static GC_NE: GridCoord = EventWindow.WINDOW_OFFSETS[7];
  static GC_SE: GridCoord = EventWindow.WINDOW_OFFSETS[8];

  //EventWindowIndex Cheatsheet
  /*
            38
         31 22 33
      25 15 10 17 27
   29 13 05 02 07 19 35
37 21 09 01 00 04 12 24 40
   30 14 06 03 08 20 36
      26 16 11 18 28
         32 23 34
            39
  */

  //index-based EW maps
  static ORIGIN: number[] = [0];
  static W: number[] = [1];
  static N: number[] = [2];
  static S: number[] = [3];
  static E: number[] = [4];
  static NW: number[] = [5];
  static SW: number[] = [6];
  static NE: number[] = [7];
  static SE: number[] = [8];

  static ADJACENT4WAY: number[] = [1, 2, 3, 4];
  static DIAGONAL4WAY: number[] = [5, 6, 7, 8];
  static ADJACENT8WAY: number[] = [...EventWindow.ADJACENT4WAY, ...EventWindow.DIAGONAL4WAY];

  static LAYER1: number[] = [1, 2, 3, 4];
  static LAYER2: number[] = [5, 6, 7, 8, 9, 10, 11, 12];
  static LAYER3: number[] = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  static LAYER4: number[] = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

  static W_LINE: number[] = [1, 9, 21, 37];
  static N_LINE: number[] = [2, 10, 22, 38];
  static S_LINE: number[] = [3, 11, 23, 39];
  static E_LINE: number[] = [4, 12, 24, 40];
  static NW_LINE: number[] = [5, 25];
  static SW_LINE: number[] = [6, 26];
  static NE_LINE: number[] = [7, 27];
  static SE_LINE: number[] = [8, 28];

  static EQUATOR: number[] = [...EventWindow.ORIGIN, ...EventWindow.W_LINE, ...EventWindow.E_LINE];
  static PRIME_MERIDIAN: number[] = [...EventWindow.ORIGIN, ...EventWindow.N_LINE, ...EventWindow.S_LINE];

  static W_QUADRANT: number[] = [1, 9, 13, 14, 21, 29, 30, 37];
  static N_QUADRANT: number[] = [2, 10, 15, 17, 22, 31, 33, 38];
  static S_QUADRANT: number[] = [3, 11, 16, 18, 23, 32, 34, 39];
  static E_QUADRANT: number[] = [4, 12, 19, 20, 24, 35, 36, 40];

  static NW_QUADRANT: number[] = [5, 13, 15, 25, 29, 31];
  static SW_QUADRANT: number[] = [6, 14, 16, 26, 30, 32];
  static NE_QUADRANT: number[] = [7, 17, 19, 27, 33, 35];
  static SE_QUADRANT: number[] = [8, 18, 20, 28, 34, 36];

  static W_HEMISPHERE: number[] = Array.from(new Set<number>([...EventWindow.NW_QUADRANT, ...EventWindow.W_LINE, ...EventWindow.SW_QUADRANT])).sort((a, b) => a - b); //[1, 5, 6, 9, 13, 14, 15, 16, 21, 25, 26, 29, 30, 31, 32, 37];
  static N_HEMISPHERE: number[] = Array.from(new Set<number>([...EventWindow.NW_QUADRANT, ...EventWindow.N_LINE, ...EventWindow.NE_QUADRANT])).sort((a, b) => a - b); //[2, 5, 7, 10, 13, 15, 17, 19, 22, 25, 27, 29, 31, 33, 35, 38];
  static S_HEMISPHERE: number[] = Array.from(new Set<number>([...EventWindow.SW_QUADRANT, ...EventWindow.S_LINE, ...EventWindow.SE_QUADRANT])).sort((a, b) => a - b); //[3, 6, 8, 11, 14, 16, 18, 20, 23, 26, 28, 30, 32, 34, 36, 39];
  static E_HEMISPHERE: number[] = Array.from(new Set<number>([...EventWindow.NE_QUADRANT, ...EventWindow.E_LINE, ...EventWindow.SE_QUADRANT])).sort((a, b) => a - b); //[4, 7, 8, 12, 17, 18, 19, 20, 24, 27, 28, 33, 34, 35, 36, 40];

  static ALL: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
  static ALLADJACENT: number[] = [1, 2, 3, 4, 5, 6, 8, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
  static OPPOSITES: number[] = [0, 4, 3, 2, 1, 8, 7, 6, 5, 12, 11, 10, 9, 20, 19, 18, 17, 16, 15, 14, 13, 24, 23, 22, 21, 28, 27, 26, 25, 36, 35, 34, 33, 32, 31, 30, 29, 40, 39, 38, 37];

  static X_REFLECTION: number[] = [0, 1, 3, 2, 4, 6, 5, 8, 7, 9, 11, 10, 12, 14, 13, 16, 15, 18, 17, 20, 19, 21, 23, 22, 24, 26, 25, 28, 27, 30, 29, 32, 31, 34, 33, 36, 35, 37, 39, 38, 40];
  static Y_REFLECTION: number[] = [0, 4, 2, 3, 1, 7, 8, 5, 6, 12, 10, 11, 9, 19, 20, 17, 18, 15, 16, 13, 14, 24, 22, 23, 21, 27, 28, 25, 26, 35, 36, 33, 34, 31, 32, 29, 30, 40, 38, 39, 37];
  static XY_REFLECTION: number[] = EventWindow.OPPOSITES;

  static SUBSETS: Map<string, number[]> = new Map<string, number[]>()
    .set("4way", EventWindow.ADJACENT4WAY)
    .set("8way", EventWindow.ADJACENT8WAY)
    .set("all", EventWindow.ALL);


  tile: Tile;
  origin: Site;
  window: Site[]; //indexed array of EW Sites

  constructor(_tile: Tile, _origin: GridCoord) {
    this.makeWindow(_tile, _origin);
  }

  private makeWindow(tile: Tile, origin: GridCoord) {

    this.origin = tile.getSiteByCoord(origin);

    //if the origin is EMPTY Element, let's save some cycles (good, bad?) - bad if you want empty's age.
    if (this.origin.atom.is(ElementTypes.EMPTY)) {
      return;
    }

    this.window = new Array<Site>();
    this.tile = tile;

    //use event window template offsets to build the rest of the event window
    let offset: GridCoord;
    let site: Site;
    const wolen: number = EventWindow.WINDOW_OFFSETS.length;

    for (let i = 0; i < wolen; i++) {

      offset = EventWindow.WINDOW_OFFSETS[i];
      site = tile.getSiteByCoord(this.offsetFromOrigin(origin, offset));

      this.window.push(site);
    }

  }

  //get relative offset gridcoord from absolute gridcoord
  //this should only be used by the makeWindow function to translate a picked site into
  //a full event window of sites
  private offsetFromOrigin(origin: GridCoord, offset: GridCoord): GridCoord {
    return { row: origin.row + offset.row, col: origin.col + offset.col };
  }



  /////////////////////////////////////
  //Index <> Offset > Site conversions
  //intentionally we don't want to deal with the programmer
  //passing us Sites, so we can convert TO sites
  //but not from Sites
  /////////////////////////////////////

  //get a site in the event window by it's row/col offset
  getSiteByOffset(offset: GridCoord): Site {
    return this.window[this.getIndexByOffset(offset)];
  }

  //get site by specific window index
  getSiteByIndex(index: number): Site {
    return index >= this.window.length || index < 0 ? undefined : this.window[index];
  }

  //get the site index by gridcoord offset { row: 1, col: 1} = 8
  getIndexByOffset(offset: GridCoord): number {
    //console.log(offset);
    return EventWindow.WINDOW_OFFSETS.findIndex(gc => {
      return (gc.col === offset.col && gc.row === offset.row);
    });
  }

  //get the site offset gridcoord by index
  getOffsetByIndex(index: number): GridCoord {
    return EventWindow.WINDOW_OFFSETS[index];
  }

  //given a destination event window index and a start (default origin) event window index
  //return the index 1-step away that is toward the destination from the start
  //possibly good for sensors to relay directional info given the limited event window
  getIndexToward(destinationIndex: number, startingIndex: number = 0): number {

    let toX: number = 0;
    let toY: number = 0;

    const startCoord: GridCoord = this.getOffsetByIndex(startingIndex);
    const [startX, startY] = [startCoord.col, startCoord.row];

    const destCoord: GridCoord = this.getOffsetByIndex(destinationIndex);
    const [destX, destY] = [destCoord.col, destCoord.row];

    if (destX > 1) { toX = startX + 1; }
    if (destX < -1) { toX = startX + (-1); }

    if (destY > 1) { toY = startY + 1; }
    if (destY < -1) { toY = startY + (-1); }

    const toCoord: GridCoord = { row: toY, col: toX };
    return this.getIndexByOffset(toCoord);

  }

  ////////////////////
  //When you have the need to tell a non-origin site what its offset to another non-origin site is.
  //Like, if origin (who has the EW) needs to tell its index 7 where its index 3 is relative to 7's position
  //useful for linked-list manipulation, hopefully other things too.
  getRelativeIndexFromSiteToSite(fromSite: number, toSite: number): number {

    const fromOffset: GridCoord = EventWindow.WINDOW_OFFSETS[fromSite];
    const toOffset: GridCoord = EventWindow.WINDOW_OFFSETS[toSite];

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


  /////////////////////////////////
  //A bunch of useful number[] math
  /////////////////////////////////

  //put many site sets together
  //pass in as many site sets (number[]) as you like!
  getUnion(...siteSets: number[][]): number[] {
    let union: number[] = [];
    siteSets.forEach(set => {
      union = [...union, ...set];
    });

    //remove duplicates and put indexes back in window order - for any near/far calculations
    union = Array.from(new Set<number>(union)).sort((a, b) => a - b); //ascending sort

    return union;
  }

  //returns a number[] of values intersecting all siteSets
  //good for dynamic EW sets, like sites on LAYER1 that are also in NORTHERM_HEMISPHERE
  getIntersection(...siteSets: number[][]): number[] {

    let intersection: number[] = this.getUnion(...siteSets);

    siteSets.forEach((set, index) => {
      intersection = [...intersection.filter(value => -1 !== set.indexOf(value))];
    });

    return intersection;
  }

  //returns the opposite of an intersection, the indexes that don't overlap in the sets
  getExclusion(...siteSets: number[][]): number[] {

    const allIndexes: number[] = this.getUnion(...siteSets);
    const inclusion: number[] = this.getIntersection(...siteSets);

    let exclusion: number[] = allIndexes.filter(value => -1 === inclusion.indexOf(value));

    return exclusion;
  }

  //given a base set of indexes, minus (remove) any in the minus sets
  getMinus(baseSet: number[], ...minusSets: number[][]): number[] {

    const minusUnion: number[] = this.getUnion(...minusSets);
    return baseSet.filter(value => -1 === minusUnion.indexOf(value)).sort((a, b) => a - b);
  }

  getOpposite(siteSet: number[]): number[] {
    return siteSet.map(index => {
      return EventWindow.OPPOSITES[index];
    })
  }

  getXReflection(siteSet: number[]): number[] {
    return siteSet.map(index => {
      return EventWindow.X_REFLECTION[index];
    })
  }

  getYReflection(siteSet: number[]): number[] {
    return siteSet.map(index => {
      return EventWindow.Y_REFLECTION[index];
    })
  }

  ///////////////////////////////
  ///////GETTING SITE SETS///////
  ///////////////////////////////

  //return all window sites (of type)
  getAll(specificType: IElementType = undefined): Site[] {
    if (specificType) {
      return this.window.filter(site => {
        if (site && site.atom.is(specificType)) {
          return true;
        } else {
          return false;
        }
      });
    }

    return this.window;
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
  get east(): Site {
    return this.getSiteByIndex(EventWindow.E[0]);
  }
  get west(): Site {
    return this.getSiteByIndex(EventWindow.W[0]);
  }
  get north(): Site {
    return this.getSiteByIndex(EventWindow.N[0]);
  }
  get south(): Site {
    return this.getSiteByIndex(EventWindow.S[0]);
  }
  get northwest(): Site {
    return this.getSiteByIndex(EventWindow.NW[0]);
  }
  get southwest(): Site {
    return this.getSiteByIndex(EventWindow.SW[0]);
  }
  get northeast(): Site {
    return this.getSiteByIndex(EventWindow.NE[0]);
  }
  get southeast(): Site {
    return this.getSiteByIndex(EventWindow.SE[0]);
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

    return candidates.filter(site => site);
  }

  //get a subset of sites from the event window, subset defined as array of indexes
  getSubset(subset: number[]): Site[] {
    return subset.map(index => {
      if (this.window[index]) {
        return this.window[index];
      }
    });
  }


  //get indexes of subset (of type)
  getIndexes(subset: number[], type: IElementType = undefined, oneRandom: boolean = false): number[] {
    let candidates: number[] = this.getSubsetIndexes(subset);

    //proxy for getSubset I guess
    if (!type && !oneRandom) {
      return candidates;
    }

    //filter by type
    if (type) {
      candidates = this.filterIndexesByType(candidates, type);
    }

    //return array of just 1 random site from filtered
    if (oneRandom) {
      return [this.getRandomIndex(candidates)];
    }

    return candidates;
  }


  getSubsetIndexes(subset: number[]): number[] {
    return subset.map(index => {
      if (this.window[index]) {
        return index;
      }
    });
  }

  filterIndexesByType(indexes: number[], type: IElementType): number[] {

    return indexes.filter(siteIndex => {
      const site: Site = this.getSiteByIndex(siteIndex);
      if (site && site.atom.is(type)) {
        return true;
      }

      return false;
    });
  }

  getRandomIndexOfType(siteSet: number[], type: IElementType): number {
    return this.getRandomIndex(this.filterIndexesByType(siteSet, type));
  }

  getRandomIndex(siteSet: number[]): number {
    const ri: number = siteSet[(Math.random() * siteSet.length) >> 0];
    return this.getSiteByIndex(ri) ? ri : undefined;
  }

  //return array of sites from site array that match type
  private filterSitesByType(sites: Site[], type: IElementType): Site[] {
    return sites.filter(site => {
      if (site && site.atom.is(type)) {
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




  is(site: number | Site = 0, type: IElementType | IElementType[]): boolean {

    let isIt: boolean = false;

    let checkSite: Site;

    if (typeof site === "number") {
      checkSite = this.getSiteByIndex(site);
    } else {
      checkSite = site;
    }

    if (!checkSite) {
      return false;
    }

    if (Array.isArray(type)) {
      const filtered: IElementType[] = type.filter(type => {
        return checkSite.atom.type === type
      });

      isIt = filtered.length ? true : false;

    } else {
      isIt = checkSite.atom.type === type;
    }

    return isIt;
  }


  //given a map of types that is keyed by Event Window index numbers
  //compare the indexes to the event window
  //this allows you to pass in a desired Event Window state and see if there's a match
  windowCompare(compareMap: Map<number, IElementType>): boolean {

    let matchCount: number = 0;
    let isMatch = false;

    compareMap.forEach((elType, key) => {

      //for now the edges don't count
      if (!this.window[key]) {
        matchCount++;
      }

      if (this.window[key] && this.window[key].atom.is(elType)) {

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
      if (!this.window[key]) {
        matchCount++;
      }

      if (this.window[key] && !this.window[key].atom.is(elType)) {
        matchCount++;
      }
    });

    if (matchCount === compareMap.size) {
      isMatch = true;
    }

    return isMatch;
  }


  /////////////////////////////////
  // EVENT WINDOW ACTIONS
  /////////////////////////////////

  move(toIndex: number, leavingAtom: Atom = undefined, fromIndex: number = 0): boolean {
    const toSite: Site = this.getSiteByIndex(toIndex);
    const fromSite: Site = this.getSiteByIndex(fromIndex);

    if (toSite && fromSite && fromSite.canMove() && toSite.canDestroy()) {

      toSite.atom = fromSite.atom;
      fromSite.atom = leavingAtom ? leavingAtom : new Atom(ElementTypes.EMPTY);
      return true;
    }

    return false;
  }

  swap(toIndex: number, fromIndex: number = 0): boolean {

    const toSite: Site = this.getSiteByIndex(toIndex);
    const fromSite: Site = this.getSiteByIndex(fromIndex);

    if (toSite && fromSite && toSite.canMove() && fromSite.canMove()) {

      //console.log("SWAP", toSite, fromSite);

      [toSite.atom, fromSite.atom] = [fromSite.atom, toSite.atom];
      return true;
    }

    return false;

  }

  mutate(targetIndex: number, atom: Atom): boolean {

    const targetSite: Site = this.getSiteByIndex(targetIndex);

    if (targetSite && targetSite.canDestroy()) {
      targetSite.atom = atom;
      return true;
    }

    return false;
  }

  destroy(targetIndex: number = 0): boolean {

    return this.mutate(targetIndex, new Atom(ElementTypes.EMPTY));

  }

}




