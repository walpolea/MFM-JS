import { Tile } from '../../src/mfm/Tile.js';
import { Site } from '../../src/mfm/Site.js';
import { Sprite, Container, Application, Texture, FederatedPointerEvent } from 'pixi.js';

export interface IRenderer {
    tile: Tile;
    render: Function;
    view: any;
}
export interface ISiteRenderer {
}
export declare class PixiRenderer implements IRenderer {
    rendererWidth: number;
    rendererHeight: number;
    tile: Tile;
    tileWidth: number;
    tileHeight: number;
    totalSites: number;
    siteSize: number;
    siteTexture: Texture;
    particleContainer: Container;
    pixiApplication: Application;
    siteVisuals: Map<Site, Sprite>;
    subdivisions: number;
    gridDivisions: number[][];
    gridDivisionTotal: number;
    siteArray: Site[];
    renderSpeed: number;
    fixedRenderSpeed: number;
    renderMultiplier: number;
    view: any;
    clickArea: Container;
    pointerDown: boolean;
    curSelectedElementFunction: Function;
    selectedSite: Site;
    mouseEnabled: boolean;
    brushSize: number;
    constructor(t: Tile, rendererW: number, rendererH: number);
    init(): Promise<void>;
    calculateSubdivisions(): number;
    setSubdivisions(subs: number): void;
    setRenderMultiplier(mult: number): void;
    initializePIXI(): Promise<void>;
    initializeVisuals(): Promise<void>;
    createSubdivisions(subdivisions: any): void;
    startRendering(): void;
    deconstruct(): void;
    render(): void;
    initializeClickArea(): void;
    getSitesFromCanvasXY(x: number, y: number, size?: number): Site[];
    getSiteFromCanvasXY(x: number, y: number): Site;
    handleClick(e: FederatedPointerEvent): void;
    addAtom(site: Site): void;
    minValue(v1: any, v2: any): any;
    maxValue(v1: any, v2: any): any;
    clear(): void;
}
