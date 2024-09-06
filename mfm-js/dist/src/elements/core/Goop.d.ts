import { Element, IElementType } from '../../mfm/Element';
import { EventWindow } from '../../mfm/EventWindow';

export declare class Goop extends Element {
    static CREATE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static WALL_GOOP: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static LIFE_GOOP: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static HC3_GOOP: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static GOOP_GRID: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static ATTRACT: (ew: EventWindow, self: Element) => boolean;
    static AVOID: (ew: EventWindow, self: Element) => boolean;
    constructor(type: IElementType, state?: any);
    init(): void;
    behave(ew: EventWindow): void;
}
