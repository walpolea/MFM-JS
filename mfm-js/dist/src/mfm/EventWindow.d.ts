import { ICoordinate } from './TileCoordinate';
import { Tile } from './Tile';
import { Site } from './Site';
import { Element, IElementType } from './Element';

export type EWIndexes = EWIndex[];
export type EWIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;
export declare class EventWindow {
    static WINDOW_OFFSETS: Array<ICoordinate>;
    static RANDOM: (subset?: EWIndex[]) => EWIndex;
    static oneIn(n: number): boolean;
    static ORIGIN: EWIndex[];
    static W: EWIndex[];
    static N: EWIndex[];
    static S: EWIndex[];
    static E: EWIndex[];
    static NW: EWIndex[];
    static SW: EWIndex[];
    static NE: EWIndex[];
    static SE: EWIndex[];
    static ADJACENT4WAY: EWIndex[];
    static DIAGONAL4WAY: EWIndex[];
    static ADJACENT8WAY: EWIndex[];
    static LAYER1: EWIndex[];
    static LAYER2: EWIndex[];
    static LAYER3: EWIndex[];
    static LAYER4: EWIndex[];
    static W_LINE: EWIndex[];
    static N_LINE: EWIndex[];
    static S_LINE: EWIndex[];
    static E_LINE: EWIndex[];
    static NW_LINE: EWIndex[];
    static SW_LINE: EWIndex[];
    static NE_LINE: EWIndex[];
    static SE_LINE: EWIndex[];
    static EQUATOR: EWIndex[];
    static PRIME_MERIDIAN: EWIndex[];
    static W_QUADRANT: EWIndex[];
    static N_QUADRANT: EWIndex[];
    static S_QUADRANT: EWIndex[];
    static E_QUADRANT: EWIndex[];
    static NW_QUADRANT: EWIndex[];
    static SW_QUADRANT: EWIndex[];
    static NE_QUADRANT: EWIndex[];
    static SE_QUADRANT: EWIndex[];
    static W_HEMISPHERE: EWIndex[];
    static N_HEMISPHERE: EWIndex[];
    static S_HEMISPHERE: EWIndex[];
    static E_HEMISPHERE: EWIndex[];
    static ALL: EWIndex[];
    static ALLADJACENT: EWIndex[];
    static OPPOSITES: EWIndex[];
    static X_REFLECTION: EWIndex[];
    static Y_REFLECTION: EWIndex[];
    static XY_REFLECTION: EWIndex[];
    static SUBSETS: Map<string, EWIndex[]>;
    origin: Site;
    window: Site[];
    constructor(_tile: Tile, _origin: ICoordinate);
    private makeWindow;
    private offsetFromOrigin;
    getSite(index: EWIndex): Site;
    getSites(indexes: EWIndex[]): Site[];
    filter(subset: EWIndex[], type?: string | string[] | IElementType | IElementType[], oneRandom?: boolean): EWIndex[];
    randomOfType(siteSet: EWIndex[], type: string | string[] | IElementType | IElementType[]): EWIndex;
    random(siteSet: EWIndex[]): EWIndex;
    filterByType(indexes: EWIndex[], type: string | string[] | IElementType | IElementType[]): EWIndex[];
    getSubsetIndexes(subset: EWIndex[]): EWIndex[];
    exists(site: EWIndex): boolean;
    is(site: EWIndex | Site, type: string | string[] | IElementType | IElementType[]): boolean;
    any(siteSet: EWIndex | EWIndex[], type: IElementType | string): boolean;
    all(siteSet: EWIndex | EWIndex[], type: IElementType | string): boolean;
    howMany(siteSet: EWIndex[], type: IElementType | string): number;
    selfIs(type: string | string[] | IElementType | IElementType[]): boolean;
    move(toIndex: EWIndex, leavingElement?: Element, fromIndex?: EWIndex): boolean;
    swap(toIndex: EWIndex, fromIndex?: EWIndex): boolean;
    replace(targetIndex: EWIndex, atom: Element): boolean;
    mutate(targetIndex: EWIndex, atomCreator: Function, creatorParams?: any[]): boolean;
    mutateMany(siteSet: EWIndex[], atomCreator: Function, creatorParams?: any[]): void;
    destroy(targetIndex?: EWIndex): boolean;
}