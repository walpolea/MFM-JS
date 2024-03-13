import { EventWindow, EWIndex } from "../mfm/EventWindow";
export declare class Build {
    static GRID: (ew: EventWindow, multiplier: Function, creator: Function) => boolean;
    static SMALL_GRID: (ew: EventWindow, multiplier: Function, creator: Function) => boolean;
    static H_LINE: (ew: EventWindow, multiplier: Function, creator: Function) => boolean;
    static V_LINE: (ew: EventWindow, multiplier: Function, creator: Function) => boolean;
    static MAKE_REPEATER(destinations: EWIndex[], steps?: number): (ew: EventWindow, multiplier: Function, creator: Function) => boolean;
}
