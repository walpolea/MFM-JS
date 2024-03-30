import { EventWindow, EWIndex } from '../../mfm/EventWindow';
import { Element, IElementType } from '../../mfm/Element';

export declare class SwapWorm extends Element {
    static CREATE: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static SMOLSW: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    static BIGSW: (_typeDefinition?: import('../../mfm/Element').IElementTypePartial, _state?: any) => Element;
    constructor(type: IElementType, state?: any);
    init(): void;
    behave(ew: EventWindow): boolean;
    establishType(ew: EventWindow): string;
    isHead(): boolean;
    isTail(): boolean;
    isMiddle(): boolean;
    isTemp(): boolean;
    confirmBehind(ew: EventWindow): boolean;
    confirmAhead(ew: EventWindow): boolean;
    isBehindTemp(ew: EventWindow): boolean;
    isAheadTemp(ew: EventWindow): boolean;
    makeGrowSegment(a: EWIndex): Element;
    makeGrowTemp(a: EWIndex): Element;
    getSegment(ew: EventWindow, segIndex: EWIndex): Element;
    swapSegments(ew: EventWindow, segIndex: EWIndex): boolean;
    grow(ew: EventWindow): boolean;
    move(ew: EventWindow): boolean;
}
