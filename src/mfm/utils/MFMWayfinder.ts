import { EWIndex } from "../core/EventWindow";
import { Utils } from "./MFMUtils";

export type DirectionMap = Map<Direction, Direction>;
export type Direction = "N" | "E" | "S" | "W" | "NW" | "NE" | "SW" | "SE" | "NNW" | "WNW" | "SSW" | "WSW" | "NNE" | "ENE" | "SSE" | "ESE";

export class Wayfinder {
  static DIRECTIONS_PRIMARY: Direction[] = ["N", "E", "S", "W"];
  static DIRECTIONS_SECONDARY: Direction[] = ["NW", "NE", "SW", "SE"];
  static DIRECTIONS_TERTIARY: Direction[] = ["NNW", "WNW", "SSW", "WSW", "NNE", "ENE", "SSE", "ESE"];
  static DIRECTIONS: Direction[] = [...Wayfinder.DIRECTIONS_PRIMARY, ...Wayfinder.DIRECTIONS_SECONDARY, ...Wayfinder.DIRECTIONS_TERTIARY];

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
  ]);

  static W_LINE: number[] = [1, 9, 21, 37];
  static N_LINE: number[] = [2, 10, 22, 38];
  static S_LINE: number[] = [3, 11, 23, 39];
  static E_LINE: number[] = [4, 12, 24, 40];

  static NW_LINE: number[] = [5, 25];
  static SW_LINE: number[] = [6, 26];
  static NE_LINE: number[] = [7, 27];
  static SE_LINE: number[] = [8, 28];

  static WNW_LINE: number[] = [13, 29];
  static NNW_LINE: number[] = [15, 31];
  static NNE_LINE: number[] = [17, 33];
  static ENE_LINE: number[] = [19, 35];

  static WSW_LINE: number[] = [14, 30];
  static SSW_LINE: number[] = [16, 32];
  static SSE_LINE: number[] = [18, 34];
  static ESE_LINE: number[] = [20, 36];

  static W_QUADRANT: number[] = [1, 9, 13, 14, 21, 29, 30, 37];
  static N_QUADRANT: number[] = [2, 10, 15, 17, 22, 31, 33, 38];
  static S_QUADRANT: number[] = [3, 11, 16, 18, 23, 32, 34, 39];
  static E_QUADRANT: number[] = [4, 12, 19, 20, 24, 35, 36, 40];

  static NW_QUADRANT: number[] = [5, 13, 15, 25, 29, 31];
  static SW_QUADRANT: number[] = [6, 14, 16, 26, 30, 32];
  static NE_QUADRANT: number[] = [7, 17, 19, 27, 33, 35];
  static SE_QUADRANT: number[] = [8, 18, 20, 28, 34, 36];

  static INDEX_DIRECTION_MAP: Map<number, Direction> = new Map<EWIndex, Direction>([
    [1, "W"],
    [2, "N"],
    [3, "S"],
    [4, "E"],
    [5, "NW"],
    [6, "SW"],
    [7, "NE"],
    [8, "SW"],
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
      dir = Utils.oneIn(2) ? (dir.substr(0, 1) as Direction) : (dir.substr(1) as Direction);
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
}
