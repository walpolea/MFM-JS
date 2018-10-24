import { GridCoord } from "../interfaces/IGridCoord";

export class MFMUtils {
  static CtoID(c: GridCoord): string {
    return `${c.row}:${c.col}`;
  }

  static IDtoC(id: string): GridCoord {
    let rca: string[] = id.split(":");
    return { row: parseInt(rca[0]), col: parseInt(rca[1]) };
  }
}
