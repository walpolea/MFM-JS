
export class Symmetries {


  //SYMMETRIES
  static PSYM_DEG000L: number[][] = Symmetries.processArrayMiddleOut([
    [38],
    [31, 22, 33],
    [25, 15, 10, 17, 27],
    [29, 13, 5, 2, 7, 19, 35],
    [37, 21, 9, 1, 0, 4, 12, 24, 40],
    [30, 14, 6, 3, 8, 20, 36],
    [26, 16, 11, 18, 28],
    [32, 23, 34],
    [39],
  ]);

  static PSYM_DEG090L: number[][] = Symmetries.processArrayMiddleOut([
    [40],
    [35, 24, 36],
    [27, 19, 12, 20, 28],
    [33, 17, 7, 4, 8, 18, 34],
    [38, 22, 10, 2, 0, 3, 11, 23, 39],
    [31, 15, 5, 1, 6, 16, 32],
    [25, 13, 9, 14, 26],
    [29, 21, 30],
    [37],
  ]);

  static PSYM_DEG180L: number[][] = Symmetries.processArrayMiddleOut([
    [39],
    [34, 23, 32],
    [28, 18, 11, 16, 26],
    [36, 20, 8, 3, 6, 14, 30],
    [40, 24, 12, 4, 0, 1, 9, 21, 37],
    [35, 19, 7, 2, 5, 13, 29],
    [27, 17, 10, 15, 25],
    [33, 22, 31],
    [38],
  ]);


  static PSYM_DEG270L: number[][] = Symmetries.processArrayMiddleOut([
    [37],
    [30, 21, 29],
    [26, 14, 9, 13, 25],
    [32, 16, 6, 1, 5, 15, 31],
    [39, 23, 11, 3, 0, 2, 10, 22, 38],
    [34, 18, 8, 4, 7, 17, 33],
    [28, 20, 12, 19, 27],
    [36, 24, 35],
    [40],
  ]);

  static PSYM_DEG000R: number[][] = Symmetries.processArrayMiddleOut([
    [39],
    [32, 23, 34],
    [26, 16, 11, 18, 28],
    [30, 14, 6, 3, 8, 20, 36],
    [37, 21, 9, 1, 0, 4, 12, 24, 40],
    [29, 13, 5, 2, 7, 19, 35],
    [25, 15, 10, 17, 27],
    [31, 22, 33],
    [38],
  ]);

  static PSYM_DEG090R: number[][] = Symmetries.processArrayMiddleOut([
    [37],
    [29, 21, 30],
    [25, 13, 9, 14, 26],
    [31, 15, 5, 1, 6, 16, 32],
    [38, 22, 10, 2, 0, 3, 11, 23, 39],
    [33, 17, 7, 4, 8, 18, 34],
    [27, 19, 12, 20, 28],
    [35, 24, 36],
    [40],
  ]);

  static PSYM_DEG180R: number[][] = Symmetries.processArrayMiddleOut([
    [38],
    [33, 22, 31],
    [27, 17, 10, 15, 25],
    [35, 19, 7, 2, 5, 13, 29],
    [40, 24, 12, 4, 0, 1, 9, 21, 37],
    [36, 20, 8, 3, 6, 14, 30],
    [28, 18, 11, 16, 26],
    [34, 23, 32],
    [39],
  ]);

  static PSYM_DEG270R: number[][] = Symmetries.processArrayMiddleOut([
    [40],
    [36, 24, 35],
    [28, 20, 12, 19, 27],
    [34, 18, 8, 4, 7, 17, 33],
    [39, 23, 11, 3, 0, 2, 10, 22, 38],
    [32, 16, 6, 1, 5, 15, 31],
    [26, 14, 9, 13, 25],
    [30, 21, 29],
    [37],
  ]);

  static PSYM_NORMAL = Symmetries.PSYM_DEG000L;
  static PSYM_FLIPX = Symmetries.PSYM_DEG180R;
  static PSYM_FLIPY = Symmetries.PSYM_DEG000R;
  static PSYM_FLIPXY = Symmetries.PSYM_DEG180L;


  static ALL: Map<number, number>[] = [
    Symmetries.SYM_MAP(Symmetries.PSYM_DEG000L),
    Symmetries.SYM_MAP(Symmetries.PSYM_DEG090L),
    Symmetries.SYM_MAP(Symmetries.PSYM_DEG180L),
    Symmetries.SYM_MAP(Symmetries.PSYM_DEG270L),
    Symmetries.SYM_MAP(Symmetries.PSYM_DEG000R),
    Symmetries.SYM_MAP(Symmetries.PSYM_DEG090R),
    Symmetries.SYM_MAP(Symmetries.PSYM_DEG180R),
    Symmetries.SYM_MAP(Symmetries.PSYM_DEG270R),
  ];

  static NORMAL: Map<number, number>[] = [
    Symmetries.SYM_MAP(Symmetries.PSYM_NORMAL)
  ];

  static NONE: Map<number, number>[] = Symmetries.NORMAL;

  static ROTATIONS: Map<number, number>[] = [
    Symmetries.SYM_MAP(Symmetries.PSYM_DEG000L),
    Symmetries.SYM_MAP(Symmetries.PSYM_DEG090L),
    Symmetries.SYM_MAP(Symmetries.PSYM_DEG180L),
    Symmetries.SYM_MAP(Symmetries.PSYM_DEG270L),
  ]

  static REFLECTX: Map<number, number>[] = [
    Symmetries.SYM_MAP(Symmetries.PSYM_NORMAL),
    Symmetries.SYM_MAP(Symmetries.PSYM_FLIPX),
  ];

  static REFLECTY: Map<number, number>[] = [
    Symmetries.SYM_MAP(Symmetries.PSYM_NORMAL),
    Symmetries.SYM_MAP(Symmetries.PSYM_FLIPY),
  ];

  static FLIPS: Map<number, number>[] = [
    Symmetries.SYM_MAP(Symmetries.PSYM_NORMAL),
    Symmetries.SYM_MAP(Symmetries.PSYM_FLIPY),
    Symmetries.SYM_MAP(Symmetries.PSYM_FLIPX),
    Symmetries.SYM_MAP(Symmetries.PSYM_FLIPXY),
  ]

  //this is what maps a symmetry to NORMAL, where key is normal index and value is symmetry index
  static SYM_MAP(sym: number[][]): Map<number, number> {

    const symmap: Map<number, number> = new Map<number, number>();

    const flatNormal = Symmetries.PSYM_NORMAL.flat();
    const flatSym = sym.flat();

    flatNormal.forEach((ni, i) => {
      symmap.set(ni, flatSym[i]);
    });

    return symmap;


  }

  //DIY Symmetry sets with a bitmask
  static GET_SYMMETRIES(bitmask: number): Map<number, number>[] {
    return Symmetries.ALL.filter((sym, index) => {
      return bitmask & (1 << index);
    })
  }

  //takes in an array of Event Window Indexes and maps them to a new symmetry
  static APPLY(indexes: number[], symmetry: Map<number, number>): number[] {
    return indexes.map((i: number) => {
      return symmetry.get(i);
    });
  }

  static processArrayMiddleOut(array: any[], startIndex?: number, direction: string = 'left'): any[] {

    if (!startIndex) {
      startIndex = array.length * .5 >> 0;
    }
    if (startIndex < 0) {
      startIndex = 0;
    }
    else if (startIndex > array.length) {
      startIndex = array.length - 1;
    };

    var newArray = [];

    var i = startIndex;

    if (direction === 'right') {
      var j = i + 1;
      while (j < array.length || i >= 0) {
        if (i >= 0) newArray.push(array[i]);
        if (j < array.length) newArray.push(array[j]);
        i--;
        j++;
      };
    }
    else if (direction === 'left') {
      var j = i - 1;
      while (j >= 0 || i < array.length) {
        if (i < array.length) newArray.push(array[i]);
        if (j >= 0) newArray.push(array[j]);
        i++;
        j--;
      };
    };

    return newArray;
  }


}