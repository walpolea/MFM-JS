import { IElementType } from "./Element";
export declare class ElementRegistry {
    static TYPES: Map<string, IElementType>;
    static GROUPS: Map<string, IElementType[]>;
    static registerType(type: IElementType): void;
    static getType(type: string | IElementType): IElementType;
}
