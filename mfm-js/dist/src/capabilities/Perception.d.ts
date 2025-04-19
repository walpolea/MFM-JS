import { IElementType } from '../mfm/Element';
import { EventWindow, EWIndex } from '../mfm/EventWindow';
import { Direction } from '../mfm/Wayfinder';

export type SignalType = "WARN" | "INFORM" | "BECKON";
export type Message = {
    senderId: string;
    senderType: IElementType | string;
    signalType: SignalType;
    message: string;
    signalDirection?: Direction;
};
export declare class Perception {
    static SENSE(ew: EventWindow, type: IElementType | string, withinSet?: EWIndex[], minQuantity?: number, maxQuantity?: number): boolean;
    static SIGNAL(ew: EventWindow, signalType: SignalType, message: Message): void;
    static RECEIVE_SIGNAL(ew: EventWindow, self: Element, indexes?: EWIndex[]): Message | null;
}
