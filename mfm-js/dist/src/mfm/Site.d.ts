import { TileCoordinate } from './TileCoordinate';
import { EventWindow } from './EventWindow';
import { Element } from './Element';

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
