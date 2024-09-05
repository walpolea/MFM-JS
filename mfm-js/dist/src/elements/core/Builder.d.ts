import { Element, IElementType } from '../../mfm/Element';
import { EventWindow } from '../../mfm/EventWindow';

export declare class Builder extends Element {
    constructor(type: IElementType, state?: any);
    init(): void;
    behave(ew: EventWindow): void;
}
