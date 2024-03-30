import { EventWindow } from '../../mfm/EventWindow';
import { Element, IElementType } from '../../mfm/Element';

export declare class DirectionalDirector extends Element {
    static CREATE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static DDIR_ONCE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    constructor(type: IElementType, state?: any);
    init(): void;
    behave(ew: EventWindow): void;
}
