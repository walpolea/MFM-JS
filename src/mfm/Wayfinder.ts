import { EventWindow, EWIndex } from "./EventWindow";

export type DirectionMap = Map<Direction, Direction>;
export type Direction = "N" | "E" | "S" | "W" | "NW" | "NE" | "SW" | "SE" | "NNW" | "WNW" | "SSW" | "WSW" | "NNE" | "ENE" | "SSE" | "ESE";

export class Wayfinder {
  static RANDOM = (subset: Direction[] = Wayfinder.DIRECTIONS): Direction => {
    return subset[~~(subset.length * Math.random())];
  };
  static NORTH: Direction = "N";
  static SOUTH: Direction = "S";
  static EAST: Direction = "E";
  static WEST: Direction = "W";

  static NORTHWEST: Direction = "NW";
  static NORTHEAST: Direction = "NE";
  static SOUTHWEST: Direction = "SW";
  static SOUTHEAST: Direction = "SE";

  static NORTHNORTHWEST: Direction = "NNW";
  static WESTNORTHWEST: Direction = "WNW";
  static NORTHNORTHEAST: Direction = "NNE";
  static EASTNORTHEAST: Direction = "ENE";
  static SOUTHSOUTHWEST: Direction = "SSW";
  static WESTWOUTHWEST: Direction = "WSW";
  static SOUTHSOUTHEAST: Direction = "SSE";
  static EASTSOUTHEAST: Direction = "ESE";

  static DIRECTIONS_PRIMARY: Direction[] = ["N", "E", "S", "W"];
  static DIRECTIONS_SECONDARY: Direction[] = ["NW", "NE", "SW", "SE"];
  static DIRECTIONS_TERTIARY: Direction[] = ["NNW", "WNW", "SSW", "WSW", "NNE", "ENE", "SSE", "ESE"];
  static DIRECTIONS: Direction[] = [...Wayfinder.DIRECTIONS_PRIMARY, ...Wayfinder.DIRECTIONS_SECONDARY, ...Wayfinder.DIRECTIONS_TERTIARY];

  static W_LINE: EWIndex[] = [1, 9, 21, 37];
  static N_LINE: EWIndex[] = [2, 10, 22, 38];
  static S_LINE: EWIndex[] = [3, 11, 23, 39];
  static E_LINE: EWIndex[] = [4, 12, 24, 40];

  static NW_LINE: EWIndex[] = [5, 25];
  static SW_LINE: EWIndex[] = [6, 26];
  static NE_LINE: EWIndex[] = [7, 27];
  static SE_LINE: EWIndex[] = [8, 28];

  static WNW_LINE: EWIndex[] = [13, 29];
  static NNW_LINE: EWIndex[] = [15, 31];
  static NNE_LINE: EWIndex[] = [17, 33];
  static ENE_LINE: EWIndex[] = [19, 35];

  static WSW_LINE: EWIndex[] = [14, 30];
  static SSW_LINE: EWIndex[] = [16, 32];
  static SSE_LINE: EWIndex[] = [18, 34];
  static ESE_LINE: EWIndex[] = [20, 36];

  static W_QUADRANT: EWIndex[] = [1, 9, 13, 14, 21, 29, 30, 37];
  static N_QUADRANT: EWIndex[] = [2, 10, 15, 17, 22, 31, 33, 38];
  static S_QUADRANT: EWIndex[] = [3, 11, 16, 18, 23, 32, 34, 39];
  static E_QUADRANT: EWIndex[] = [4, 12, 19, 20, 24, 35, 36, 40];

  static NW_QUADRANT: EWIndex[] = [5, 13, 15, 25, 29, 31];
  static SW_QUADRANT: EWIndex[] = [6, 14, 16, 26, 30, 32];
  static NE_QUADRANT: EWIndex[] = [7, 17, 19, 27, 33, 35];
  static SE_QUADRANT: EWIndex[] = [8, 18, 20, 28, 34, 36];

  static NNW_QUADRANT: EWIndex[] = [5, 15, 25, 31];
  static WNW_QUADRANT: EWIndex[] = [5, 13, 25, 29];
  static SSW_QUADRANT: EWIndex[] = [6, 16, 26, 32];
  static WSW_QUADRANT: EWIndex[] = [6, 14, 26, 30];
  static NNE_QUADRANT: EWIndex[] = [7, 17, 27, 33];
  static ENE_QUADRANT: EWIndex[] = [7, 19, 27, 35];
  static SSE_QUADRANT: EWIndex[] = [8, 18, 28, 34];
  static ESE_QUADRANT: EWIndex[] = [8, 20, 28, 36];

  static DIRMAP_CLOCKWISE_PRIMARY: DirectionMap = new Map<Direction, Direction>([
    ["E", "S"],
    ["S", "W"],
    ["W", "N"],
    ["N", "E"],
  ]);

  static DIRMAP_COUNTERCLOCKWISE_PRIMARY: DirectionMap = new Map<Direction, Direction>([
    ["E", "N"],
    ["N", "W"],
    ["W", "S"],
    ["S", "E"],
  ]);

  static DIRMAP_CLOCKWISE_SECONDARY: DirectionMap = new Map<Direction, Direction>([
    ["E", "SE"],
    ["SE", "S"],
    ["S", "SW"],
    ["SW", "W"],
    ["W", "NW"],
    ["NW", "N"],
    ["N", "NE"],
    ["NE", "E"],
  ]);

  static DIRMAP_COUNTERCLOCKWISE_SECONDARY: DirectionMap = new Map<Direction, Direction>([
    ["E", "NE"],
    ["NE", "N"],
    ["N", "NW"],
    ["NW", "W"],
    ["W", "SW"],
    ["SW", "S"],
    ["S", "SE"],
    ["SE", "E"],
  ]);

  static DIRMAP_CLOCKWISE_ALL: DirectionMap = new Map<Direction, Direction>([
    ["E", "ESE"],
    ["ESE", "SE"],
    ["SE", "SSE"],
    ["SSE", "S"],
    ["S", "SSW"],
    ["SSW", "SW"],
    ["SW", "WSW"],
    ["WSW", "W"],
    ["W", "WNW"],
    ["WNW", "NW"],
    ["NW", "NNW"],
    ["NNW", "N"],
    ["N", "NNE"],
    ["NNE", "NE"],
    ["NE", "ENE"],
    ["ENE", "E"],
  ]);

  static DIRMAP_COUNTERCLOCKWISE_ALL: DirectionMap = new Map<Direction, Direction>([
    ["E", "ENE"],
    ["ENE", "NE"],
    ["NE", "NNE"],
    ["NNE", "N"],
    ["N", "NNW"],
    ["NNW", "NW"],
    ["NW", "WNW"],
    ["WNW", "W"],
    ["W", "WSW"],
    ["WSW", "SW"],
    ["SW", "SSW"],
    ["SSW", "S"],
    ["S", "SSE"],
    ["SSE", "SE"],
    ["SE", "ESE"],
    ["ESE", "E"],
  ]);

  static DIRMAP_REVERSE: DirectionMap = new Map<Direction, Direction>([
    ["E", "W"],
    ["W", "E"],
    ["S", "N"],
    ["N", "S"],
    ["NW", "SE"],
    ["SE", "NW"],
    ["NE", "SW"],
    ["SW", "NE"],
    ["ENE", "WSW"],
    ["WSW", "ENE"],
    ["NNE", "SSW"],
    ["SSW", "NNE"],
    ["NNW", "SSE"],
    ["SSE", "NNW"],
    ["WNW", "ESE"],
    ["ESE", "WNW"],
  ]);

  static DIRECTIONS_INDEX_MAP: Map<Direction, EWIndex> = new Map<Direction, EWIndex>([
    ["W", 1],
    ["N", 2],
    ["S", 3],
    ["E", 4],
    ["NW", 5],
    ["SW", 6],
    ["NE", 7],
    ["SE", 8],
    ["WNW", 13],
    ["WSW", 14],
    ["NNW", 15],
    ["SSW", 16],
    ["NNE", 17],
    ["SSE", 18],
    ["ENE", 19],
    ["ESE", 20],
  ]);

  static DIRECTIONS_FRONT_MAP: Map<Direction, EWIndex[]> = new Map<Direction, EWIndex[]>([
    ["W", Wayfinder.W_LINE],
    ["N", Wayfinder.N_LINE],
    ["S", Wayfinder.S_LINE],
    ["E", Wayfinder.E_LINE],
    ["NW", Wayfinder.NW_LINE],
    ["SW", Wayfinder.SW_LINE],
    ["NE", Wayfinder.NE_LINE],
    ["SE", Wayfinder.SE_LINE],
    ["WNW", Wayfinder.WNW_LINE],
    ["NNW", Wayfinder.NNW_LINE],
    ["NNE", Wayfinder.NNE_LINE],
    ["ENE", Wayfinder.ENE_LINE],
    ["WSW", Wayfinder.WSW_LINE],
    ["SSW", Wayfinder.SSW_LINE],
    ["SSE", Wayfinder.SSE_LINE],
    ["ESE", Wayfinder.ESE_LINE],
  ]);

  static DIRECTIONS_FRONT_QUADRANT_MAP: Map<Direction, EWIndex[]> = new Map<Direction, EWIndex[]>([
    ["W", Wayfinder.W_QUADRANT],
    ["N", Wayfinder.N_QUADRANT],
    ["S", Wayfinder.S_QUADRANT],
    ["E", Wayfinder.E_QUADRANT],
    ["NW", Wayfinder.NW_QUADRANT],
    ["SW", Wayfinder.SW_QUADRANT],
    ["NE", Wayfinder.NE_QUADRANT],
    ["SE", Wayfinder.SE_QUADRANT],

    ["WNW", Wayfinder.WNW_QUADRANT],
    ["NNW", Wayfinder.NNW_QUADRANT],
    ["NNE", Wayfinder.NNE_QUADRANT],
    ["ENE", Wayfinder.ENE_QUADRANT],
    ["WSW", Wayfinder.WSW_QUADRANT],
    ["SSW", Wayfinder.SSW_QUADRANT],
    ["SSE", Wayfinder.SSE_QUADRANT],
    ["ESE", Wayfinder.ESE_QUADRANT],
  ]);

  static DIRECTIONS_BEHIND_MAP: Map<Direction, EWIndex[]> = new Map<Direction, EWIndex[]>([
    ["W", Wayfinder.E_LINE],
    ["N", Wayfinder.S_LINE],
    ["S", Wayfinder.N_LINE],
    ["E", Wayfinder.W_LINE],
    ["NW", Wayfinder.SE_LINE],
    ["SW", Wayfinder.NE_LINE],
    ["NE", Wayfinder.SW_LINE],
    ["SE", Wayfinder.NW_LINE],
    ["WNW", Wayfinder.ESE_LINE],
    ["NNW", Wayfinder.SSE_LINE],
    ["NNE", Wayfinder.SSW_LINE],
    ["ENE", Wayfinder.WSW_LINE],
    ["WSW", Wayfinder.ENE_LINE],
    ["SSW", Wayfinder.NNE_LINE],
    ["SSE", Wayfinder.NNW_LINE],
    ["ESE", Wayfinder.WNW_LINE],
  ]);

  static DIRECTIONS_BEHIND_QUADRANT_MAP: Map<Direction, EWIndex[]> = new Map<Direction, EWIndex[]>([
    ["W", Wayfinder.E_QUADRANT],
    ["N", Wayfinder.S_QUADRANT],
    ["S", Wayfinder.N_QUADRANT],
    ["E", Wayfinder.W_QUADRANT],
    ["NW", Wayfinder.SE_QUADRANT],
    ["SW", Wayfinder.NE_QUADRANT],
    ["NE", Wayfinder.SW_QUADRANT],
    ["SE", Wayfinder.NW_QUADRANT],

    ["WNW", Wayfinder.ESE_QUADRANT],
    ["NNW", Wayfinder.SSE_QUADRANT],
    ["NNE", Wayfinder.SSW_QUADRANT],
    ["ENE", Wayfinder.WSW_QUADRANT],
    ["WSW", Wayfinder.ENE_QUADRANT],
    ["SSW", Wayfinder.NNE_QUADRANT],
    ["SSE", Wayfinder.NNW_QUADRANT],
    ["ESE", Wayfinder.WNW_QUADRANT],
  ]);

  static DIRECTIONS_LEFT_MAP: Map<Direction, EWIndex[]> = new Map<Direction, EWIndex[]>([
    ["W", Wayfinder.S_LINE],
    ["N", Wayfinder.W_LINE],
    ["S", Wayfinder.E_LINE],
    ["E", Wayfinder.N_LINE],
    ["NW", Wayfinder.SW_LINE],
    ["SW", Wayfinder.SE_LINE],
    ["NE", Wayfinder.NW_LINE],
    ["SE", Wayfinder.NE_LINE],
    ["WNW", Wayfinder.SSW_LINE],
    ["NNW", Wayfinder.WSW_LINE],
    ["NNE", Wayfinder.WNW_LINE],
    ["ENE", Wayfinder.NNW_LINE],
    ["WSW", Wayfinder.SSE_LINE],
    ["SSW", Wayfinder.ESE_LINE],
    ["SSE", Wayfinder.ENE_LINE],
    ["ESE", Wayfinder.NNE_LINE],
  ]);

  static DIRECTIONS_LEFT_QUADRANT_MAP: Map<Direction, EWIndex[]> = new Map<Direction, EWIndex[]>([
    ["W", Wayfinder.S_QUADRANT],
    ["N", Wayfinder.W_QUADRANT],
    ["S", Wayfinder.E_QUADRANT],
    ["E", Wayfinder.N_QUADRANT],
    ["NW", Wayfinder.SW_QUADRANT],
    ["SW", Wayfinder.SE_QUADRANT],
    ["NE", Wayfinder.NW_QUADRANT],
    ["SE", Wayfinder.NE_QUADRANT],
    ["WNW", Wayfinder.SSW_QUADRANT],
    ["NNW", Wayfinder.WSW_QUADRANT],
    ["NNE", Wayfinder.WNW_QUADRANT],
    ["ENE", Wayfinder.NNW_QUADRANT],
    ["WSW", Wayfinder.SSE_QUADRANT],
    ["SSW", Wayfinder.ESE_QUADRANT],
    ["SSE", Wayfinder.ENE_QUADRANT],
    ["ESE", Wayfinder.NNE_QUADRANT],
  ]);

  static DIRECTIONS_RIGHT_MAP: Map<Direction, EWIndex[]> = new Map<Direction, EWIndex[]>([
    ["W", Wayfinder.N_LINE],
    ["N", Wayfinder.E_LINE],
    ["S", Wayfinder.W_LINE],
    ["E", Wayfinder.S_LINE],
    ["NW", Wayfinder.SE_LINE],
    ["SW", Wayfinder.NE_LINE],
    ["NE", Wayfinder.SE_LINE],
    ["SE", Wayfinder.NW_LINE],
    ["WNW", Wayfinder.ESE_LINE],
    ["NNW", Wayfinder.SSE_LINE],
    ["NNE", Wayfinder.SSW_LINE],
    ["ENE", Wayfinder.WSW_LINE],
    ["WSW", Wayfinder.ENE_LINE],
    ["SSW", Wayfinder.NNE_LINE],
    ["SSE", Wayfinder.NNW_LINE],
    ["ESE", Wayfinder.WNW_LINE],
  ]);

  static DIRECTIONS_RIGHT_QUADRANT_MAP: Map<Direction, EWIndex[]> = new Map<Direction, EWIndex[]>([
    ["W", Wayfinder.N_QUADRANT],
    ["N", Wayfinder.E_QUADRANT],
    ["S", Wayfinder.W_QUADRANT],
    ["E", Wayfinder.S_QUADRANT],
    ["NW", Wayfinder.NE_QUADRANT],
    ["SW", Wayfinder.NW_QUADRANT],
    ["NE", Wayfinder.SE_QUADRANT],
    ["SE", Wayfinder.SW_QUADRANT],
    ["WNW", Wayfinder.ESE_QUADRANT],
    ["NNW", Wayfinder.SSE_QUADRANT],
    ["NNE", Wayfinder.SSW_QUADRANT],
    ["ENE", Wayfinder.WSW_QUADRANT],
    ["WSW", Wayfinder.ENE_QUADRANT],
    ["SSW", Wayfinder.NNE_QUADRANT],
    ["SSE", Wayfinder.NNW_QUADRANT],
    ["ESE", Wayfinder.WNW_QUADRANT],
  ]);

  static INDEX_DIRECTION_MAP: Map<number, Direction> = new Map<EWIndex, Direction>([
    [1, "W"],
    [2, "N"],
    [3, "S"],
    [4, "E"],
    [5, "NW"],
    [6, "SW"],
    [7, "NE"],
    [8, "SE"],
    [9, "W"],
    [10, "N"],
    [11, "S"],
    [12, "E"],
    [13, "WNW"],
    [14, "WSW"],
    [15, "NNW"],
    [16, "SSW"],
    [17, "NNE"],
    [18, "SSE"],
    [19, "ENE"],
    [20, "ESE"],
    [21, "W"],
    [22, "N"],
    [23, "S"],
    [24, "E"],
    [25, "NW"],
    [26, "SW"],
    [27, "NE"],
    [28, "SE"],
    [29, "WNW"],
    [30, "WSW"],
    [31, "NNW"],
    [32, "SSW"],
    [33, "NNE"],
    [34, "SSE"],
    [35, "ENE"],
    [36, "ESE"],
    [37, "W"],
    [38, "N"],
    [39, "S"],
    [40, "E"],
  ]);

  static directionToIndex(dir: Direction, useSecondaryDirections: boolean = false): number {
    return Wayfinder.DIRECTIONS_INDEX_MAP.get(dir);
  }

  static indexToDirection(index: EWIndex, useSecondaryDirections: boolean = false): Direction {
    return Wayfinder.INDEX_DIRECTION_MAP.get(index);
  }

  static getDirectionalMove(dir: Direction, useSecondaryDirections: boolean = false): EWIndex {
    if (!useSecondaryDirections && dir.length == 2) {
      dir = dir.split("")[(Math.random() * dir.length) >> 0] as Direction;
    } else if (dir.length > 2) {
      dir = EventWindow.oneIn(2) ? (dir.substr(0, 1) as Direction) : (dir.substr(1) as Direction);
    }

    return Wayfinder.DIRECTIONS_INDEX_MAP.get(dir);
  }

  //given a direction and a DirectionMap, return the next direction
  static nextDirection(dir: Direction, directionMap: DirectionMap): Direction {
    return directionMap.get(dir);
  }

  static reverse(dir: Direction): Direction {
    return Wayfinder.DIRMAP_REVERSE.get(dir);
  }

  //LEFT
  static turnLeft(dir: Direction): Direction {
    return Wayfinder.veerLeft(Wayfinder.veerLeft(dir));
  }

  static veerLeft(dir: Direction): Direction {
    return Wayfinder.slightLeft(Wayfinder.slightLeft(dir));
  }

  static slightLeft(dir: Direction): Direction {
    return Wayfinder.nextDirection(dir, Wayfinder.DIRMAP_COUNTERCLOCKWISE_ALL);
  }

  //RIGHT
  static turnRight(dir: Direction): Direction {
    return Wayfinder.veerRight(Wayfinder.veerRight(dir));
  }

  static veerRight(dir: Direction): Direction {
    return Wayfinder.slightRight(Wayfinder.slightRight(dir));
  }

  static slightRight(dir: Direction): Direction {
    return Wayfinder.nextDirection(dir, Wayfinder.DIRMAP_CLOCKWISE_ALL);
  }

  static getInFront(dir: Direction, getQuadrant: boolean = false): EWIndex[] {
    if (getQuadrant) {
      return Wayfinder.DIRECTIONS_FRONT_QUADRANT_MAP.get(dir);
    }
    return Wayfinder.DIRECTIONS_FRONT_MAP.get(dir);
  }

  static getBehind(dir: Direction, getQuadrant: boolean = false): EWIndex[] {
    if (getQuadrant) {
      return Wayfinder.DIRECTIONS_BEHIND_QUADRANT_MAP.get(dir);
    }
    return Wayfinder.DIRECTIONS_BEHIND_MAP.get(dir);
  }

  static getLeft(dir: Direction, getQuadrant: boolean = false): EWIndex[] {
    if (getQuadrant) {
      return Wayfinder.DIRECTIONS_LEFT_QUADRANT_MAP.get(dir);
    }
    return Wayfinder.DIRECTIONS_LEFT_MAP.get(dir);
  }

  static getRight(dir: Direction, getQuadrant: boolean = false): EWIndex[] {
    if (getQuadrant) {
      return Wayfinder.DIRECTIONS_RIGHT_QUADRANT_MAP.get(dir);
    }
    return Wayfinder.DIRECTIONS_RIGHT_MAP.get(dir);
  }

  static slightRandom(dir: Direction): Direction {
    return EventWindow.oneIn(2) ? this.slightRight(dir) : this.slightLeft(dir);
  }

  static veerRandom(dir: Direction): Direction {
    return EventWindow.oneIn(2) ? this.veerRight(dir) : this.veerLeft(dir);
  }

  static turnRandom(dir: Direction): Direction {
    return EventWindow.oneIn(2) ? this.turnRight(dir) : this.turnLeft(dir);
  }
}
