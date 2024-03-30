import { EventWindow } from '../../mfm/EventWindow';
import { Element, IElementType } from '../../mfm/Element';

export declare class Builder extends Element {
    constructor(type: IElementType, state?: any);
    init(): void;
    behave(ew: EventWindow): void;
}
