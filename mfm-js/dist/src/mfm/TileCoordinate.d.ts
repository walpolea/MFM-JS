export interface ICoordinate {
    x: number;
    y: number;
}
export interface ITileCoordinate {
    id: string;
    coordinate: ICoordinate;
}
export declare class TileCoordinate {
    static CoordinateToId(c: ICoordinate): string;
    static IdToCoordinate(id: string): ICoordinate;
    static fromCoordinate(c: ICoordinate): TileCoordinate;
    static fromId(id: string): TileCoordinate;
    id: string;
    coordinate: ICoordinate;
    constructor(id: string);
}
