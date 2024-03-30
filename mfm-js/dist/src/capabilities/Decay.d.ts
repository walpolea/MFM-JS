import { EventWindow } from '../mfm/EventWindow';
import { Element } from '../mfm/Element';

export declare class Decay {
    static MAKE_DECAY(lifeSpan: number, deathChance?: number): (ew: EventWindow, self: Element) => void;
    static DECAY(ew: EventWindow, self: Element, lifeSpan: number, deathChance?: number): boolean;
}
