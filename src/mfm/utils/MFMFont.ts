export interface FontCharacter {
  positive: number[];
  negative: number[];
}


export class MFMFont {

  static characters: Map<string, FontCharacter> = new Map<string, FontCharacter>()
    .set("A", {
      positive: [1, 2, 4, 6, 8],
      negative: [0, 3, 5, 7]
    })
    .set("B", {
      positive: [0, 1, 2, 3, 4, 5, 6, 8],
      negative: [7]
    })
    .set("C", {
      positive: [1, 2, 3, 5, 6, 7, 8],
      negative: [0, 4,]
    })
    .set("D", {
      positive: [0, 1, 2, 3, 4, 5, 6],
      negative: [7, 8]
    })
    .set("E", {
      positive: [0, 1, 2, 3, 5, 6, 7, 8],
      negative: [4]
    })
    .set("F", {
      positive: [0, 1, 2, 5, 6, 7],
      negative: [3, 4, 8]
    })
    .set("G", {
      positive: [1, 2, 3, 4, 5, 6, 8],
      negative: [0, 7]
    })
    .set("H", {
      positive: [0, 1, 4, 5, 6, 7, 8],
      negative: [2, 3]
    })
    .set("I", {
      positive: [0, 2, 3, 5, 6, 7, 8],
      negative: [1, 4]
    })
    .set("J", {
      positive: [1, 3, 6, 7, 8],
      negative: [0, 2, 5]
    })
    .set("K", {
      positive: [0, 1, 5, 6, 7, 8],
      negative: [2, 3, 4]
    })
    .set("L", {
      positive: [1, 3, 5, 6, 8],
      negative: [0, 2, 4, 7]
    })
    .set("M", {
      positive: [0, 1, 2, 4, 5, 6, 7, 8],
      negative: [3]
    })
    .set("N", {
      positive: [1, 2, 4, 5, 6, 7, 8],
      negative: [0, 3]
    })
    .set("O", {
      positive: [1, 2, 3, 4, 5, 6, 7, 8],
      negative: [0]
    })
    .set("P", {
      positive: [0, 1, 2, 4, 5, 6, 7],
      negative: [3, 8]
    })
    .set("Q", {
      positive: [0, 1, 2, 5, 8],
      negative: [3, 4, 6, 7]
    })
    .set("R", {
      positive: [1, 2, 4, 5, 6, 7],
      negative: [0, 3, 8]
    })
    .set("S", {
      positive: [0, 2, 3, 6, 7],
      negative: [1, 4, 5, 8]
    })
    .set("T", {
      positive: [0, 2, 3, 5, 7],
      negative: [1, 4, 6, 8]
    })
    .set("U", {
      positive: [1, 3, 4, 5, 6, 7, 8],
      negative: [0, 2]
    })
    .set("V", {
      positive: [1, 3, 4, 5, 7],
      negative: [0, 2, 6, 8]
    })
    .set("W", {
      positive: [0, 1, 3, 4, 5, 6, 7, 8],
      negative: [2]
    })
    .set("X", {
      positive: [0, 5, 6, 7, 8],
      negative: [1, 2, 3, 4]
    })
    .set("Y", {
      positive: [0, 3, 5, 7],
      negative: [1, 2, 4, 6, 8]
    })
    .set("Z", {
      positive: [0, 2, 3, 5, 8],
      negative: [1, 4, 6, 7]
    });


  static getNegative(pos: number[]): number[] {
    const allIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return allIndexes.filter(value => -1 === pos.indexOf(value));
  };

}