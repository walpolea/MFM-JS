import { Site } from "./Site";
import { ICoordinate } from "./TileCoordinate";
export declare class Tile {
    width: number;
    height: number;
    sites: Map<string, Site>;
    sitesArray: Site[];
    rands: Array<number>;
    cur: number;
    isRunning: boolean;
    constructor(_width?: number, _height?: number);
    seedRandoms(): void;
    getSiteByCoordinate(c: ICoordinate): Site;
    getSiteById(id: string): Site;
    getRandomSite(): Site;
    getRandomSiteSeeded(): Site;
    getRandomSiteInRange(range: number[]): Site;
    getRandomSiteInRangeSeeded(range: number[]): Site;
    create(): void;
    add(atomizer: any, x?: number, y?: number): void;
    exportAtoms(): unknown[];
    clear(t?: string): void;
}
