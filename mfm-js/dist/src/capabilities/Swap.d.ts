import { EventWindow, EWIndex } from '../mfm/EventWindow';
import { IElementType } from '../mfm/Element';

export declare class Swap {
    static DOWN: (ew: EventWindow, chance?: number) => boolean;
    static SIDE: (ew: EventWindow, chance?: number) => boolean;
    static SLIP: (ew: EventWindow, chance?: number) => boolean;
    static SINK: (ew: EventWindow, chance?: number) => boolean;
    static FLOAT: (ew: EventWindow, chance?: number) => boolean;
    static PATROL: (ew: EventWindow, chance?: number) => boolean;
    static PATROL_8: (ew: EventWindow, chance?: number) => boolean;
    static CREATE(direction: EWIndex[], type?: string | IElementType): (ew: EventWindow, chance?: number) => boolean;
}
