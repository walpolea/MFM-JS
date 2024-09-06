import { Element, IElementType } from '../../mfm/Element';
import { EventWindow } from '../../mfm/EventWindow';

export declare class Res extends Element {
    static CREATE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    constructor(type: IElementType, state?: any);
    behave(ew: EventWindow): void;
}
