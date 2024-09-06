import { Element, IElementType } from '../../mfm/Element';
import { EventWindow } from '../../mfm/EventWindow';

export declare class WormTrap extends Element {
    static CREATE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static BUILDER: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    constructor(type: IElementType, state?: any);
    init(): void;
    behave(ew: EventWindow): void;
    captureWorm(ew: EventWindow): Boolean;
}
