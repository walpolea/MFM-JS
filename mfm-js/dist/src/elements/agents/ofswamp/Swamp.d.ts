import { EventWindow } from '../../../mfm/EventWindow';
import { Element, IElementType } from '../../../mfm/Element';

export declare class Swamp extends Element {
    static CREATE: (_typeDefinition?: import('../../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static BOG: (_typeDefinition?: import('../../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    constructor(type: IElementType, state?: any);
    init(): void;
    behave(ew: EventWindow): void;
    grow(ew: EventWindow): void;
}
