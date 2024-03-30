import { EventWindow } from '../../mfm/EventWindow';
import { Element, IElementType } from '../../mfm/Element';

export declare class SwapLine extends Element {
    static CREATE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static NORTH: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static SOUTH: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static EAST: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static WEST: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static NW: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static NE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static SW: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static SE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    constructor(type: IElementType, state?: any);
    init(): void;
    behave(ew: EventWindow): void;
}
