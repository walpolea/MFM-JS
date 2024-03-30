import { EventWindow } from '../../mfm/EventWindow';
import { Element, IElementType } from '../../mfm/Element';

export declare class Sand extends Element {
    static CREATE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static RED_SAND: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static PINK_SAND: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static FLOATY_SAND: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static GREEN_SAND: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static BLUE_SAND: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static PURPLE_SAND: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static SAND_GRID: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static BUBBLE: (ew: EventWindow) => boolean;
    constructor(type: IElementType, state?: any);
    init(): void;
    behave(ew: EventWindow): void;
}
