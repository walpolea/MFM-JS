export interface IElementType {
  name: string;
  type: string;
}

export class ElementTypes {
  static EMPTY: IElementType = { name: "EMPTY", type: "E" };
  static D_REG: IElementType = { name: "D_REG", type: "D" };
}
