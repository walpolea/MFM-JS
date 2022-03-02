import { Empty } from "../elements/core/Empty";
import { Element, IElementType } from "./Element";
import { Site } from "./Site";
import { Tile } from "./Tile";
import { ICoordinate } from "./TileCoordinate";

export type EWIndexes = EWIndex[];
export type EWIndex =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40;

//Event window as describbed here: http://robust.cs.unm.edu/lib/exe/fetch.php?w=300&tok=4c8f49&media=dev:event-window-10.png
//xlection of sites which contain atoms, built from an origin (center) site
export class EventWindow {
  static WINDOW_OFFSETS: Array<ICoordinate> = [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: -1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 },
    { x: -2, y: 0 },
    { x: 0, y: -2 },
    { x: 0, y: 2 },
    { x: 2, y: 0 },
    { x: -2, y: -1 },
    { x: -2, y: 1 },
    { x: -1, y: -2 },
    { x: -1, y: 2 },
    { x: 1, y: -2 },
    { x: 1, y: 2 },
    { x: 2, y: -1 },
    { x: 2, y: 1 },
    { x: -3, y: 0 },
    { x: 0, y: -3 },
    { x: 0, y: 3 },
    { x: 3, y: 0 },
    { x: -2, y: -2 },
    { x: -2, y: 2 },
    { x: 2, y: -2 },
    { x: 2, y: 2 },
    { x: -3, y: -1 },
    { x: -3, y: 1 },
    { x: -1, y: -3 },
    { x: -1, y: 3 },
    { x: 1, y: -3 },
    { x: 1, y: 3 },
    { x: 3, y: -1 },
    { x: 3, y: 1 },
    { x: -4, y: 0 },
    { x: 0, y: -4 },
    { x: 0, y: 4 },
    { x: 4, y: 0 },
  ];

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

  static RANDOM = (subset: EWIndex[] = EventWindow.ALLADJACENT): EWIndex => {
    return subset[~~(subset.length * Math.random())];
  };

  static oneIn(n: number): boolean {
    return n === 0 ? false : Math.random() * n < 1;
  }

  //index-based EW maps
  static ORIGIN: EWIndex[] = [0];
  static W: EWIndex[] = [1];
  static N: EWIndex[] = [2];
  static S: EWIndex[] = [3];
  static E: EWIndex[] = [4];
  static NW: EWIndex[] = [5];
  static SW: EWIndex[] = [6];
  static NE: EWIndex[] = [7];
  static SE: EWIndex[] = [8];

  static ADJACENT4WAY: EWIndex[] = [1, 2, 3, 4];
  static DIAGONAL4WAY: EWIndex[] = [5, 6, 7, 8];
  static ADJACENT8WAY: EWIndex[] = [...EventWindow.ADJACENT4WAY, ...EventWindow.DIAGONAL4WAY];

  static LAYER1: EWIndex[] = [1, 2, 3, 4];
  static LAYER2: EWIndex[] = [5, 6, 7, 8, 9, 10, 11, 12];
  static LAYER3: EWIndex[] = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  static LAYER4: EWIndex[] = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

  static W_LINE: EWIndex[] = [1, 9, 21, 37];
  static N_LINE: EWIndex[] = [2, 10, 22, 38];
  static S_LINE: EWIndex[] = [3, 11, 23, 39];
  static E_LINE: EWIndex[] = [4, 12, 24, 40];
  static NW_LINE: EWIndex[] = [5, 25];
  static SW_LINE: EWIndex[] = [6, 26];
  static NE_LINE: EWIndex[] = [7, 27];
  static SE_LINE: EWIndex[] = [8, 28];

  static EQUATOR: EWIndex[] = [...EventWindow.ORIGIN, ...EventWindow.W_LINE, ...EventWindow.E_LINE];
  static PRIME_MERIDIAN: EWIndex[] = [...EventWindow.ORIGIN, ...EventWindow.N_LINE, ...EventWindow.S_LINE];

  static W_QUADRANT: EWIndex[] = [1, 9, 13, 14, 21, 29, 30, 37];
  static N_QUADRANT: EWIndex[] = [2, 10, 15, 17, 22, 31, 33, 38];
  static S_QUADRANT: EWIndex[] = [3, 11, 16, 18, 23, 32, 34, 39];
  static E_QUADRANT: EWIndex[] = [4, 12, 19, 20, 24, 35, 36, 40];

  static NW_QUADRANT: EWIndex[] = [5, 13, 15, 25, 29, 31];
  static SW_QUADRANT: EWIndex[] = [6, 14, 16, 26, 30, 32];
  static NE_QUADRANT: EWIndex[] = [7, 17, 19, 27, 33, 35];
  static SE_QUADRANT: EWIndex[] = [8, 18, 20, 28, 34, 36];

  static W_HEMISPHERE: EWIndex[] = Array.from(new Set<EWIndex>([...EventWindow.NW_QUADRANT, ...EventWindow.W_LINE, ...EventWindow.SW_QUADRANT])).sort(
    (a, b) => a - b
  ); //[1, 5, 6, 9, 13, 14, 15, 16, 21, 25, 26, 29, 30, 31, 32, 37];
  static N_HEMISPHERE: EWIndex[] = Array.from(new Set<EWIndex>([...EventWindow.NW_QUADRANT, ...EventWindow.N_LINE, ...EventWindow.NE_QUADRANT])).sort(
    (a, b) => a - b
  ); //[2, 5, 7, 10, 13, 15, 17, 19, 22, 25, 27, 29, 31, 33, 35, 38];
  static S_HEMISPHERE: EWIndex[] = Array.from(new Set<EWIndex>([...EventWindow.SW_QUADRANT, ...EventWindow.S_LINE, ...EventWindow.SE_QUADRANT])).sort(
    (a, b) => a - b
  ); //[3, 6, 8, 11, 14, 16, 18, 20, 23, 26, 28, 30, 32, 34, 36, 39];
  static E_HEMISPHERE: EWIndex[] = Array.from(new Set<EWIndex>([...EventWindow.NE_QUADRANT, ...EventWindow.E_LINE, ...EventWindow.SE_QUADRANT])).sort(
    (a, b) => a - b
  ); //[4, 7, 8, 12, 17, 18, 19, 20, 24, 27, 28, 33, 34, 35, 36, 40];

  static ALL: EWIndex[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ];
  static ALLADJACENT: EWIndex[] = [
    1, 2, 3, 4, 5, 6, 8, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ];
  static OPPOSITES: EWIndex[] = [
    0, 4, 3, 2, 1, 8, 7, 6, 5, 12, 11, 10, 9, 20, 19, 18, 17, 16, 15, 14, 13, 24, 23, 22, 21, 28, 27, 26, 25, 36, 35, 34, 33, 32, 31, 30, 29, 40, 39, 38, 37,
  ];

  static X_REFLECTION: EWIndex[] = [
    0, 1, 3, 2, 4, 6, 5, 8, 7, 9, 11, 10, 12, 14, 13, 16, 15, 18, 17, 20, 19, 21, 23, 22, 24, 26, 25, 28, 27, 30, 29, 32, 31, 34, 33, 36, 35, 37, 39, 38, 40,
  ];
  static Y_REFLECTION: EWIndex[] = [
    0, 4, 2, 3, 1, 7, 8, 5, 6, 12, 10, 11, 9, 19, 20, 17, 18, 15, 16, 13, 14, 24, 22, 23, 21, 27, 28, 25, 26, 35, 36, 33, 34, 31, 32, 29, 30, 40, 38, 39, 37,
  ];
  static XY_REFLECTION: EWIndex[] = EventWindow.OPPOSITES;

  static SUBSETS: Map<string, EWIndex[]> = new Map<string, EWIndex[]>()
    .set("4way", EventWindow.ADJACENT4WAY)
    .set("8way", EventWindow.ADJACENT8WAY)
    .set("all", EventWindow.ALL);

  origin: Site;
  window: Site[];

  constructor(_tile: Tile, _origin: ICoordinate) {
    this.makeWindow(_tile, _origin);
  }

  private makeWindow(tile: Tile, origin: ICoordinate) {
    this.origin = tile.getSiteByCoordinate(origin);

    this.window = new Array<Site>(41);

    //use event window template offsets to build the rest of the event window
    let offset: ICoordinate;
    let site: Site;
    const wolen: number = EventWindow.WINDOW_OFFSETS.length;

    for (let i = 0; i < wolen; i++) {
      offset = EventWindow.WINDOW_OFFSETS[i];
      site = tile.getSiteByCoordinate(this.offsetFromOrigin(origin, offset));

      this.window[i] = site;
    }
  }

  //get relative offset ICoordinate from absolute ICoordinate
  //this should only be used by the makeWindow function to translate a picked site into
  //a full event window of sites
  private offsetFromOrigin(origin: ICoordinate, offset: ICoordinate): ICoordinate {
    return { y: origin.y + offset.y, x: origin.x + offset.x };
  }

  //get site by specific window index
  getSite(index: EWIndex): Site {
    return this.window[index] ?? undefined;
  }

  //get indexes of subset (of type) and possible only 1 random of the result
  //extremely useful in searching the event window for circumstances of element types
  filter(subset: EWIndex[], type: string | string[] | IElementType | IElementType[] = undefined, oneRandom: boolean = false): EWIndex[] {
    let candidates: EWIndex[] = this.getSubsetIndexes(subset);

    //proxy for getSubset I guess
    if (!type && !oneRandom) {
      return candidates;
    }

    //filter by type
    if (type) {
      candidates = this.filterByType(candidates, type);
    }

    //return array of just 1 random site from filtered
    if (oneRandom) {
      return [this.random(candidates)];
    }

    return candidates;
  }

  randomOfType(siteSet: EWIndex[], type: string | string[] | IElementType | IElementType[]): EWIndex {
    return this.random(this.filterByType(siteSet, type));
  }

  random(siteSet: EWIndex[]): EWIndex {
    const ri: EWIndex = siteSet[~~(Math.random() * siteSet.length)];
    return this.getSite(ri) ? ri : undefined;
  }

  filterByType(indexes: EWIndex[], type: string | string[] | IElementType | IElementType[]): EWIndex[] {
    return indexes.filter((siteIndex) => {
      const site: Site = this.getSite(siteIndex);
      return site && site.atom.is(type) ? true : false;
    });
  }

  getSubsetIndexes(subset: EWIndex[]): EWIndex[] {
    return subset.map((index) => {
      if (this.window[index]) {
        return index;
      }
    });
  }

  is(site: EWIndex | Site = 0, type: string | string[] | IElementType | IElementType[]): boolean {
    let isIt: boolean = false;

    let checkSite: Site;

    if (typeof site === "number") {
      checkSite = this.getSite(site);
    } else {
      checkSite = site;
    }

    if (!checkSite) {
      return false;
    }

    if (Array.isArray(type)) {
      const filtered: Array<string | IElementType> = (type as Array<string | IElementType>).filter((t: IElementType | string) => {
        return checkSite.atom.is(t);
      });

      isIt = filtered.length ? true : false;
    } else {
      isIt = checkSite.atom.is(type);
    }

    return isIt;
  }

  any(siteSet: EWIndex | EWIndex[], type: IElementType | string): boolean {
    if (!Array.isArray(siteSet)) {
      siteSet = [siteSet];
    }
    if (this.howMany(siteSet, type) > 0) {
      return true;
    }

    return false;
  }

  all(siteSet: EWIndex | EWIndex[], type: IElementType | string): boolean {
    if (!Array.isArray(siteSet)) {
      siteSet = [siteSet];
    }
    if (this.howMany(siteSet, type) === siteSet.length) {
      return true;
    }

    return false;
  }

  howMany(siteSet: EWIndex[], type: IElementType | string): number {
    return this.filter(siteSet, type, false).length;
  }

  selfIs(type: string | string[] | IElementType | IElementType[]): boolean {
    return this.is(0, type);
  }

  /////////////////////////////////
  // EVENT WINDOW ACTIONS
  /////////////////////////////////

  move(toIndex: EWIndex, leavingElement: Element = undefined, fromIndex: EWIndex = 0): boolean {
    const toSite: Site = this.getSite(toIndex);
    const fromSite: Site = this.getSite(fromIndex);

    if (toSite && fromSite) {
      toSite.atom = fromSite.atom;

      if (leavingElement) {
        fromSite.atom = leavingElement;
      } else {
        fromSite.atom = Empty.CREATE();
      }
      return true;
    }

    return false;
  }

  swap(toIndex: EWIndex, fromIndex: EWIndex = 0): boolean {
    const toSite: Site = this.getSite(toIndex);
    const fromSite: Site = this.getSite(fromIndex);

    if (toSite && fromSite) {
      [toSite.atom, fromSite.atom] = [fromSite.atom, toSite.atom];
      return true;
    }

    return false;
  }

  replace(targetIndex: EWIndex, atom: Element): boolean {
    const targetSite: Site = this.getSite(targetIndex);

    if (targetSite) {
      targetSite.atom = atom;
      return true;
    }

    return false;
  }

  mutate(targetIndex: EWIndex, atomCreator: Function, creatorParams: any[] = [{}, {}]): boolean {
    const targetSite: Site = this.getSite(targetIndex);

    if (targetSite) {
      targetSite.atom = atomCreator(...creatorParams);
      return true;
    }

    return false;
  }

  mutateMany(siteSet: EWIndex[], atomCreator: Function, creatorParams: any[] = [{}, {}]) {
    siteSet.forEach((sn) => {
      this.mutate(sn, atomCreator, creatorParams);
    });
  }

  destroy(targetIndex: EWIndex = 0): boolean {
    return this.mutate(targetIndex, Empty.CREATE);
  }
}
