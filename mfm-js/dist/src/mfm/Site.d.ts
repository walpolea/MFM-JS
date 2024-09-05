import { Element } from './Element';
import { EventWindow } from './EventWindow';
import { TileCoordinate } from './TileCoordinate';

export declare class Site {
    location: TileCoordinate;
    id: string;
    atom: Element;
    baseAtom: Element;
    ew: EventWindow;
    constructor(_loc: TileCoordinate);
    create(): void;
    swapAtoms(targetSite: Site): boolean;
    mutate(atom: Element): void;
    mutateBase(atom: Element): void;
}
