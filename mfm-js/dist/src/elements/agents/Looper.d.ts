import { EventWindow } from '../../mfm/EventWindow';
import { Element, IElementType } from '../../mfm/Element';

export declare class Looper extends Element {
    static CREATE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static WONKY: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static LOOP_WALL: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static LOOP_DIRECTOR: (heading: any) => any;
    static REPEL_DIRECTIONAL: (ew: EventWindow, self: Element) => boolean;
    constructor(type: IElementType, state?: any);
    init(): void;
    makeBigTail(ew: EventWindow): void;
    behave(ew: EventWindow): void;
    behaveAsLooper(ew: EventWindow): void;
    behaveAsWonky(ew: EventWindow): void;
}
