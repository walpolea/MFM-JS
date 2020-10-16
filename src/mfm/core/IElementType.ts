export interface IElementType {
  name: string;
  symbol: string;
  class: any;
  color?: number;
  params?: any[];
  CREATE?: Function;
}

export interface IElementTypePartial {
  name?: string;
  symbol?: string;
  class?: any;
  color?: number;
  params?: any[];
  CREATE?: Function;
}
