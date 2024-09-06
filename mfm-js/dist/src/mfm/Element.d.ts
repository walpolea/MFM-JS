import { EventWindow } from './EventWindow';

export interface IElementType {
    name: string;
    class: any;
    symbol?: string;
    color?: number;
    CREATE?: Function;
    classifications?: string[];
    groups?: string[];
}
export interface IElementTypePartial {
    symbol?: string;
    name?: string;
    class?: any;
    color?: number;
    CREATE?: Function;
    classifications?: string[];
    groups?: string[];
}
export interface IElement {
    TYPE: IElementType;
    behave: Function;
    state?: any;
}
export declare abstract class Element implements IElement {
    static CREATOR(typeDefinition: IElementType, state?: any): (_typeDefinition?: IElementTypePartial, _state?: any) => Element;
    TYPE: IElementType;
    state: any;
    classes: Set<string>;
    constructor(_type: IElementType, initialState?: any);
    initializeState(state?: any): void;
    behave(ew: EventWindow): void;
    rd(key: string): any;
    wr(key: string, value: any): any;
    classifyAs(c: string | IElementType): void;
    declassify(c: string | IElementType): void;
    is(type: string | IElementType | string[] | IElementType[]): boolean;
    isCore(type: string | IElementType): boolean;
}
