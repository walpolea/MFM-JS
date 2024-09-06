import { Element } from '../mfm/Element';
import { EventWindow } from '../mfm/EventWindow';

export declare class Decay {
    static MAKE_DECAY(lifeSpan: number, deathChance?: number): (ew: EventWindow, self: Element) => void;
    static DECAY(ew: EventWindow, self: Element, lifeSpan: number, deathChance?: number): boolean;
}
