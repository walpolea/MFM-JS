import { IElementType } from "../mfm/Element";
import { EventWindow, EWIndex } from "../mfm/EventWindow";
import { Signal } from "../elements/agents/Signal";
import { Wayfinder } from "../main";
import { Direction } from "../mfm/Wayfinder";

export type SignalType = "WARN" | "INFORM" | "BECKON";
export type Message = {
  senderId: string;
  senderType: IElementType | string;
  signalType: SignalType;
  message: string;
  signalDirection?: Direction;
};

export class Perception {

  static SENSE(ew: EventWindow, type: IElementType | string, withinSet: EWIndex[] = EventWindow.ALLADJACENT, minQuantity: number = 1, maxQuantity: number = 1): boolean {
    const count = ew.howMany(withinSet, type);
    if (count < minQuantity || count > maxQuantity) {
      return false;
    }
    return true;
  }

  static SIGNAL(ew: EventWindow, signalType: SignalType, message: Message): void {
    const d = EventWindow.RANDOM(EventWindow.LAYER3);
    const signal = Signal.CREATOR({ name: "SIGNAL", class: Signal, color: 0xff0000, classifications: ["DIRECTIONAL", "DECAYABLE"], groups: ["MFM"] }, { heading: Wayfinder.indexToDirection(d), signalType, message });
    if( ew.is(d, "EMPTY") ) {
      ew.mutate(d, signal);
    }
  }

  static RECEIVE_SIGNAL(ew:EventWindow, self: Element, indexes: EWIndex[] = EventWindow.ALLADJACENT): Message | null {
    const signalIndex = ew.filter(indexes, "SIGNAL", true)?.[0];
    if (!signalIndex) return null;
    
    const signal = ew.getSite(signalIndex)?.atom;
    const message = signal.state.message;
    if( message.senderId === self.state.uid ) return null;
    const signalDirection = Wayfinder.reverse( signal.state.heading );

    ew.destroy(signalIndex);
    return { ...message, signalDirection };
  }
}