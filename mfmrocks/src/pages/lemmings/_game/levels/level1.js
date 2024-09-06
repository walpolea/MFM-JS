export const LEVEL1 = {
  id: 'level1',
  name: 'Just Dig!',
  description: 'Dig your way to the exit!',
  difficulty: 1,
  map: {
    width: 64,
    height:48,
    atoms: [
      //LEMMINGS
      {x: 0, y: 4, type: 'LEMIT', 
        settings: {
          state: { emitCount: 100 }
        },
      },
      //WALLS
      {
        from: { x: 0, y: 13 },
        to: { x:5, y:13 },
        type: 'WALL'
      },
      {
        from: { x: 5, y: 14 },
        to: { x:10, y:14 },
        type: 'WALL'
      },
      {
        from: {x: 11, y: 14},
        to: {x: 19, y: 19},
        type: "WALL"
      },
      {
        from: {x: 20, y: 19},
        to: {x: 31, y: 19},
        type: "WALL"
      },
      { x: 31, y: 18, type: 'WALL' },
    ],
  }
};