import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Wayfinder } from "../../mfm/Wayfinder";
import { Director } from "./Director";
import { LivingWall } from "./LivingWall";


export class DirectorWall extends Element {
  static CREATE = DirectorWall.CREATOR({ name: "DIRECTOR WALL", symbol: "DRWL", class: DirectorWall, color: 0xbe146f, groups: ["Structural"] });

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {}

  behave(ew: EventWindow) {
    super.behave(ew);

    const emptyWallNeighbors = ew.filterByType([...EventWindow.LAYER1, ...EventWindow.LAYER2, ...EventWindow.LAYER3], ["EMPTY", "DIRECTOR"]);

    if (emptyWallNeighbors.length > 0) {
      ew.mutateMany( emptyWallNeighbors, LivingWall.CREATE );
    }

    const emptyDirectorNeighbors = ew.filterByType(EventWindow.LAYER4, "EMPTY");
    
    if( emptyDirectorNeighbors.length > 0 ) {
      emptyDirectorNeighbors.forEach( (i) => {
        let pointingDirection = Wayfinder.indexToDirection(i);
        const directorDirection = Wayfinder.turnLeft(pointingDirection);
        ew.mutate( i, Director.DIRECTORS_MAP.get(directorDirection) );
      });
    } 
    
    if( EventWindow.oneIn(1000) ) {
      const directorNeighbors = ew.filterByType(EventWindow.LAYER4, "DIRECTOR");
      ew.destroy(ew.random(directorNeighbors));
    }

  }
}
