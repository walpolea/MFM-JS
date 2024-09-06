import { Element, IElementType } from '../../mfm/Element';
import { EventWindow } from '../../mfm/EventWindow';

export declare class Water extends Element {
    static CREATE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static BUBBLY_WATER: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static WATER_GRID: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static WATER_LINE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static DO_BUBBLE: (ew: EventWindow) => boolean;
    constructor(type: IElementType, state?: any);
    init(): void;
    behave(ew: EventWindow): void;
}
