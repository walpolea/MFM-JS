import { Direction } from '../../mfm/Wayfinder';
import { EventWindow } from '../../mfm/EventWindow';
import { Element, IElementType } from '../../mfm/Element';

export declare class Director extends Element {
    static N: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static S: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static E: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static W: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static NE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static NW: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static SW: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static SE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static NNE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static NNW: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static ENE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static WNW: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static SSE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static SSW: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static ESE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static WSW: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static DIRECTORS_MAP: Map<Direction, Function>;
    constructor(type: IElementType, state?: any);
    init(): void;
    behave(ew: EventWindow): void;
}
