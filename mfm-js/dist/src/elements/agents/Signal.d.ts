import { Element, IElementType } from '../../mfm/Element';
import { EventWindow } from '../../mfm/EventWindow';

export declare class Signal extends Element {
    static CREATE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static N: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static NE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static E: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static SE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static S: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static SW: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static W: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static NW: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    constructor(type: IElementType, state?: any);
    init(): void;
    behave(ew: EventWindow): void;
}
