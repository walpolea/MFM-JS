import { EWIndex } from "../core/EventWindow";

export interface FontCharacter {
  positive: EWIndex[];
  negative: EWIndex[];
}

export class Font {
  static POSITION_ORIGIN_MAP: Map<EWIndex, EWIndex> = new Map<EWIndex, EWIndex>([
    [0, 0],
    [1, 4],
    [2, 3],
    [3, 2],
    [4, 1],
    [5, 8],
    [6, 7],
    [7, 6],
    [8, 5],
  ]);

  static ALL_CHARACTERS: string[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "=",
    "-",
    "*",
    "/",
    "<",
    ">",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    " ",
  ];

  static characters: Map<string, FontCharacter> = new Map<string, FontCharacter>()
    .set("A", {
      positive: [1, 2, 4, 6, 8],
      negative: [0, 3, 5, 7],
    })
    .set("B", {
      positive: [0, 1, 2, 3, 4, 5, 6, 8],
      negative: [7],
    })
    .set("C", {
      positive: [1, 2, 3, 5, 6, 7, 8],
      negative: [0, 4],
    })
    .set("D", {
      positive: [0, 1, 2, 3, 4, 5, 6],
      negative: [7, 8],
    })
    .set("E", {
      positive: [0, 1, 2, 3, 5, 6, 7, 8],
      negative: [4],
    })
    .set("F", {
      positive: [0, 1, 2, 5, 6, 7],
      negative: [3, 4, 8],
    })
    .set("G", {
      positive: [1, 2, 3, 4, 5, 6, 8],
      negative: [0, 7],
    })
    .set("H", {
      positive: [0, 1, 4, 5, 6, 7, 8],
      negative: [2, 3],
    })
    .set("I", {
      positive: [0, 2, 3, 5, 6, 7, 8],
      negative: [1, 4],
    })
    .set("J", {
      positive: [1, 3, 6, 7, 8],
      negative: [0, 2, 5],
    })
    .set("K", {
      positive: [0, 1, 5, 6, 7, 8],
      negative: [2, 3, 4],
    })
    .set("L", {
      positive: [1, 3, 5, 6, 8],
      negative: [0, 2, 4, 7],
    })
    .set("M", {
      positive: [0, 1, 2, 4, 5, 6, 7, 8],
      negative: [3],
    })
    .set("N", {
      positive: [1, 2, 4, 5, 6, 7, 8],
      negative: [0, 3],
    })
    .set("O", {
      positive: [1, 2, 3, 4, 5, 6, 7, 8],
      negative: [0],
    })
    .set("P", {
      positive: [0, 1, 2, 4, 5, 6, 7],
      negative: [3, 8],
    })
    .set("Q", {
      positive: [0, 1, 2, 5, 8],
      negative: [3, 4, 6, 7],
    })
    .set("R", {
      positive: [1, 2, 4, 5, 6, 7],
      negative: [0, 3, 8],
    })
    .set("S", {
      positive: [0, 2, 3, 6, 7],
      negative: [1, 4, 5, 8],
    })
    .set("T", {
      positive: [0, 2, 3, 5, 7],
      negative: [1, 4, 6, 8],
    })
    .set("U", {
      positive: [1, 3, 4, 5, 6, 7, 8],
      negative: [0, 2],
    })
    .set("V", {
      positive: [1, 3, 4, 5, 7],
      negative: [0, 2, 6, 8],
    })
    .set("W", {
      positive: [0, 1, 3, 4, 5, 6, 7, 8],
      negative: [2],
    })
    .set("X", {
      positive: [0, 5, 6, 7, 8],
      negative: [1, 2, 3, 4],
    })
    .set("Y", {
      positive: [0, 3, 5, 7],
      negative: [1, 2, 4, 6, 8],
    })
    .set("Z", {
      positive: [0, 2, 3, 5, 8],
      negative: [1, 4, 6, 7],
    })
    .set("0", {
      positive: [1, 2, 3, 4, 5, 6, 7, 8],
      negative: [],
    })
    .set("1", {
      positive: [0, 2, 3, 5, 6, 8],
      negative: [1, 4, 7],
    })
    .set("2", {
      positive: [2, 3, 4, 5, 6, 8],
      negative: [0, 1, 7],
    })
    .set("3", {
      positive: [0, 2, 3, 4, 5, 6, 7, 8],
      negative: [1],
    })
    .set("4", {
      positive: [0, 1, 4, 5, 7, 8],
      negative: [2, 3, 6],
    })
    .set("5", {
      positive: [1, 2, 3, 5, 7, 8],
      negative: [0, 4, 6],
    })
    .set("6", {
      positive: [0, 3, 6, 7, 8],
      negative: [1, 2, 4, 5],
    })
    .set("7", {
      positive: [0, 2, 5, 6, 7],
      negative: [1, 3, 4, 8],
    })
    .set("8", {
      positive: [0, 1, 2, 3, 4, 6, 7],
      negative: [5, 8],
    })
    .set("9", {
      positive: [0, 1, 2, 4, 5, 7, 8],
      negative: [3, 6],
    })
    .set("+", {
      positive: [0, 1, 2, 3, 4],
      negative: [5, 6, 7, 8],
    })
    .set("-", {
      positive: [0, 1, 4],
      negative: [2, 3, 5, 6, 7, 8],
    })
    .set("*", {
      positive: [5, 6, 7, 8],
      negative: [0, 1, 2, 3, 4],
    })
    .set("/", {
      positive: [0, 6, 7],
      negative: [1, 2, 3, 4, 5, 8],
    })
    .set("=", {
      positive: [2, 3, 5, 6, 7, 8],
      negative: [0, 1, 4],
    })
    .set("<", {
      positive: [0, 1, 7, 8],
      negative: [2, 3, 4, 5, 6],
    })
    .set(">", {
      positive: [0, 4, 5, 6],
      negative: [1, 2, 3, 7, 8],
    })
    .set(" ", {
      positive: [],
      negative: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    });

  static initLowerCase() {
    Font.characters
      .set("a", Font.characters.get("a".toUpperCase()))
      .set("b", Font.characters.get("b".toUpperCase()))
      .set("c", Font.characters.get("c".toUpperCase()))
      .set("d", Font.characters.get("d".toUpperCase()))
      .set("e", Font.characters.get("e".toUpperCase()))
      .set("f", Font.characters.get("f".toUpperCase()))
      .set("g", Font.characters.get("g".toUpperCase()))
      .set("h", Font.characters.get("h".toUpperCase()))
      .set("i", Font.characters.get("i".toUpperCase()))
      .set("j", Font.characters.get("j".toUpperCase()))
      .set("k", Font.characters.get("k".toUpperCase()))
      .set("l", Font.characters.get("l".toUpperCase()))
      .set("m", Font.characters.get("m".toUpperCase()))
      .set("n", Font.characters.get("n".toUpperCase()))
      .set("o", Font.characters.get("o".toUpperCase()))
      .set("p", Font.characters.get("p".toUpperCase()))
      .set("q", Font.characters.get("q".toUpperCase()))
      .set("r", Font.characters.get("r".toUpperCase()))
      .set("s", Font.characters.get("s".toUpperCase()))
      .set("t", Font.characters.get("t".toUpperCase()))
      .set("u", Font.characters.get("u".toUpperCase()))
      .set("v", Font.characters.get("v".toUpperCase()))
      .set("w", Font.characters.get("w".toUpperCase()))
      .set("x", Font.characters.get("x".toUpperCase()))
      .set("y", Font.characters.get("y".toUpperCase()))
      .set("z", Font.characters.get("z".toUpperCase()));
  }

  /*
  
  */

  static getNegative(pos: number[]): number[] {
    const allIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return allIndexes.filter((value) => -1 === pos.indexOf(value));
  }
}

Font.initLowerCase();
