export interface ICoordinate {
  x: number;
  y: number;
}

export interface ITileCoordinate {
  id: string;
  coordinate: ICoordinate;
}

export class TileCoordinate {
  static CoordinateToId(c: ICoordinate): string {
    return `${c.y}:${c.x}`;
  }

  static IdToCoordinate(id: string): ICoordinate {
    const [y, x] = id.split(":");
    return { y: +y, x: +x };
  }

  static fromCoordinate(c: ICoordinate): TileCoordinate {
    return new TileCoordinate(TileCoordinate.CoordinateToId(c));
  }

  static fromId(id: string): TileCoordinate {
    return new TileCoordinate(id);
  }

  id: string;
  coordinate: ICoordinate;

  constructor(id: string) {
    this.id = id;
    this.coordinate = TileCoordinate.IdToCoordinate(this.id);
  }
}
