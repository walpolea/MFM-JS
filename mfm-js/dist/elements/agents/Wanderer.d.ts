import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
export declare class Wanderer extends Element {
    static CREATE: (_typeDefinition?: import("../../mfm/Element").IElementTypePartial, _state?: any) => Element;
    static FLY: (_typeDefinition?: import("../../mfm/Element").IElementTypePartial, _state?: any) => Element;
    static MOSQUITO: (_typeDefinition?: import("../../mfm/Element").IElementTypePartial, _state?: any) => Element;
    static BIRD: (_typeDefinition?: import("../../mfm/Element").IElementTypePartial, _state?: any) => Element;
    static SWAMPDATA: (_typeDefinition?: import("../../mfm/Element").IElementTypePartial, _state?: any) => Element;
    static BIRD_WING: (_typeDefinition?: import("../../mfm/Element").IElementTypePartial, _state?: any) => Element;
    static FLY_TAIL: (_typeDefinition?: import("../../mfm/Element").IElementTypePartial, _state?: any) => Element;
    static MOSQUITO_TAIL: (_typeDefinition?: import("../../mfm/Element").IElementTypePartial, _state?: any) => Element;
    constructor(type: IElementType, state?: any);
    init(): void;
    behave(ew: EventWindow): void;
    behaveAsFly(ew: EventWindow): void;
    behaveAsMosquito(ew: EventWindow): void;
    behaveAsBird(ew: EventWindow): void;
    behaveAsSwampData(ew: EventWindow): void;
    blazeTrail(ew: EventWindow): void;
}
