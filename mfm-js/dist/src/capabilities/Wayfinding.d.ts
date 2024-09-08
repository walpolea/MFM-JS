import { Element } from '../mfm/Element';
import { EventWindow, EWIndex } from '../mfm/EventWindow';
import { Direction } from '../mfm/Wayfinder';

export declare class Wayfinding {
    static NAME: string;
    static REVERSE(self: Element): void;
    static SLIGHT_LEFT(self: Element): void;
    static VEER_LEFT(self: Element): void;
    static TURN_LEFT(self: Element): void;
    static SLIGHT_RIGHT(self: Element): void;
    static VEER_RIGHT(self: Element): void;
    static TURN_RIGHT(self: Element): void;
    static SLIGHT_RANDOMLY(self: Element): void;
    static VEER_RANDOMLY(self: Element): void;
    static TURN_RANDOMLY(self: Element): void;
    static SET_DIRECTION(self: Element, d: Direction): void;
    static MOVE_IN_DIRECTION(ew: EventWindow, self: Element, direction: Direction | Direction[], types?: string | string[], leavingAtom?: Element): boolean;
    static MOVE_DIRECTIONALLY(ew: EventWindow, self: Element, types?: string | string[], leavingAtom?: Element): boolean;
    static SWAP_IN_DIRECTION(ew: EventWindow, self: Element, direction: Direction | Direction[], types?: string | string[]): boolean;
    static SWAP_DIRECTIONALLY(ew: EventWindow, self: Element, types?: string | string[]): boolean;
    static DIRECT(ew: EventWindow, s: EWIndex, heading: Direction): boolean;
}
