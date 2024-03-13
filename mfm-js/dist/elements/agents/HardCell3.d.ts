import { Element, IElementType } from "../../mfm/Element";
import { EventWindow, EWIndex } from "../../mfm/EventWindow";
import { Direction } from "../../mfm/Wayfinder";
export declare class HardCell3 extends Element {
    static CREATE: (_typeDefinition?: import("../../mfm/Element").IElementTypePartial, _state?: any) => Element;
    static HC3x8: (_typeDefinition?: import("../../mfm/Element").IElementTypePartial, _state?: any) => Element;
    static HC3x4: (_typeDefinition?: import("../../mfm/Element").IElementTypePartial, _state?: any) => Element;
    static CELL_SITES: EWIndex[];
    static CELL_WANDER_MAP: Map<EWIndex, EWIndex[]>;
    static CELL_DIRECTION_MAP: Map<EWIndex, Direction>;
    static COLORS: number[];
    constructor(type: IElementType, state?: any);
    init(): void;
    behave(ew: EventWindow): void;
    hasStasis(ew: EventWindow): Boolean;
    hasBadStructure(ew: EventWindow): Boolean;
    figureHops(ew: EventWindow): void;
    setColor(): void;
    canMove(ew: EventWindow): Boolean;
    shouldRegrow(ew: EventWindow): Boolean;
    shouldMove(ew: EventWindow): Direction | false;
    localType(): string;
    isRoot(): Boolean;
    isEnd(): Boolean;
    upstreams(ew: EventWindow): EWIndex[];
    downstreams(ew: EventWindow): EWIndex[];
    neighbors(ew: EventWindow): EWIndex[];
    getDirectionFromWanderMap(ew: EventWindow, site: EWIndex): Direction;
}
