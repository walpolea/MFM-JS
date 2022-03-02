import { IElementType } from "./Element";

export class ElementRegistry {
  static TYPES: Map<string, IElementType> = new Map<string, IElementType>();
  static GROUPS: Map<string, IElementType[]> = new Map<string, IElementType[]>();

  static registerType(type: IElementType) {
    this.TYPES.set(type.name.toUpperCase(), type);

    const groups = type.groups ?? ["Misc"];

    groups.forEach((g) => {
      if (!this.GROUPS.has(g)) {
        this.GROUPS.set(g, []);
      }

      const group = this.GROUPS.get(g);
      this.GROUPS.set(g, [...group, type]);
    });
  }

  static getType(type: string | IElementType): IElementType {
    return typeof type === "string" ? this.TYPES.get(type.toUpperCase()) : this.TYPES.get(type.name.toUpperCase());
  }
}
