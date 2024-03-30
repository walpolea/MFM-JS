import { EventWindow, EWIndex } from '../mfm/EventWindow';
import { Element } from '../mfm/Element';

export declare class Repel {
    static NAME: string;
    static CREATE(repelType: string, repelSites: EWIndex[], escapeType: string, escapeSites: EWIndex[]): (ew: EventWindow) => boolean;
    static FAR_NORTH(ew: EventWindow, repelType: string | string[], escapeType?: string | string[]): boolean;
    static MAKE_REPELLER(_repelTypes: string | string[], fromIndexes?: EWIndex[], toIndexes?: EWIndex[]): (ew: EventWindow, self: Element) => boolean;
    static MAKE_AVOIDER(_repelTypes: string | string[], fromIndexes?: EWIndex[], toIndexes?: EWIndex[]): (ew: EventWindow, self: Element) => boolean;
    static MAKE_ATTRACTOR(_attractTypes: string | string[], view?: EWIndex[]): (ew: EventWindow, self: Element) => boolean;
}
