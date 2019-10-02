/*
    .
   ...
  .....
 .......
....@....
 .......
  ..... 
   ... 
    .

         [38]
      [31,32,33]
    [25,15,10,17,27]
  [29,13,5,2,7,19,35]
[37,21,9,1,0,4,12,24,40]
  [30,14,6,3,8,20,36]
    [26,16,11,18,28]
      [32,23,34]
         [39]

[38,31,32,33,25,15,10,17,27,29,13,5,2,7,19,35,37,21,9,1,0,4,12,24,40,30,14,6,3,8,20,36,26,16,11,18,28,32,23,34,39]
*/

export class SPLAT {

  static ewMiddleOutIndexMap: number[][] = SPLAT.processArrayMiddleOut([
    [38],
    [31, 32, 33],
    [25, 15, 10, 17, 27],
    [29, 13, 5, 2, 7, 19, 35],
    [37, 21, 9, 1, 0, 4, 12, 24, 40],
    [30, 14, 6, 3, 8, 20, 36],
    [26, 16, 11, 18, 28],
    [32, 23, 34],
    [39],
  ]);

  static splatToMap(splatDiagram: string): Map<number, string> {

    //console.log(splatDiagram);

    //split map by lines
    let lines: string[] = splatDiagram.split("\n");

    //remove spaces and empty lines
    let allLines: string[][] = lines.map(l => l.replace(/\s+/g, "")).filter(l => l !== "").map(l => {
      return l.split("");
    });

    //arrange all rows middle-out
    allLines = SPLAT.processArrayMiddleOut(allLines);

    //pad the splatDiagram with missing ew spots
    const lineLengths: number[] = [9, 7, 7, 5, 5, 3, 3, 1, 1];
    for (let i = 0; i < allLines.length; i++) {

      const lineLen = lineLengths[i];
      let line = allLines[i];
      let addSide = 0;

      //pad left and right until line is proper length
      while (line.length < lineLen) {
        line.push("~");
        line.unshift("~");
      }

      if (line.length > lineLen) {
        line.shift();
      }

      allLines[i] = line;

    }

    //console.log(allLines);

    //map the indexes
    const EWMAP: Map<number, string> = new Map<number, string>();
    for (let i = 0; i < SPLAT.ewMiddleOutIndexMap.length; i++) {
      SPLAT.ewMiddleOutIndexMap[i].forEach((index, j) => {
        if ((index || index === 0) && allLines[i] && allLines[i][j] && allLines[i][j] !== "~") {
          EWMAP.set(index, allLines[i][j]);
        }
      });
    };

    //console.log(EWMAP);

    return EWMAP;

  }

  static processArrayMiddleOut(array: any[], startIndex?: number, direction: string = 'left') {

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