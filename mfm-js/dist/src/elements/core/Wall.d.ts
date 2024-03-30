import { EventWindow } from '../../mfm/EventWindow';
import { Element, IElementType } from '../../mfm/Element';

export declare class Wall extends Element {
    static CREATE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static MOVABLE_WALL: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static DECAY_WALL: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static DECAY_WALL_10: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static DECAY_WALL_25: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static DECAY_WALL_50: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static MOVABLE_WALL_GRID: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    constructor(type: IElementType, state?: any);
    init(): void;
    behave(ew: EventWindow): void;
}
