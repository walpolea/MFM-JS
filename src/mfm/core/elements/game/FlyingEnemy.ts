import { EventWindow, EWIndex } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Empty } from "./EmptyElement";
import { SPLAT } from "../../utils/SPLAT";
import { Symmetries } from "../../utils/Symmetries";
import { Utils } from "../../utils/MFMUtils";
import { Atom } from "../Atom";
import { Wayfinder, Direction } from "../../utils/MFMWayfinder";

export class FlyingEnemy extends Elem {
  static TYPE_DEF: IElementType = { name: "FlyingEnemy", type: "Fl", class: FlyingEnemy, color: 0xff66cc };
  static CREATE = FlyingEnemy.CREATOR();

  direction: Direction;
  counter = 0;
  max = 3;

  constructor() {
    super(FlyingEnemy.TYPE_DEF);
    this.direction = Wayfinder.DIRECTIONS[(Wayfinder.DIRECTIONS.length * Math.random()) >> 0];
  }

  reverse() {
    this.direction = Wayfinder.reverse(this.direction);
  }

  exec(ew: EventWindow) {

    const outerPlayer = ew.getIndexes([...EventWindow.LAYER3, ...EventWindow.LAYER4], Player.TYPE_DEF, true)[0];

    if( outerPlayer && Utils.oneIn(30) ) {
      ew.destroy(outerPlayer);

      if( Utils.oneIn(2) ) {
        ew.destroy();
      }
    }
    
    const nearbyPlayer = ew.getNearestIndex(EventWindow.ADJACENT8WAY, Player.TYPE_DEF);

    if( nearbyPlayer  && Utils.oneIn(5) ) {
      ew.destroy(nearbyPlayer);
      
      if( Utils.oneIn(3) ) {
        ew.destroy();
      }
    }

    this.counter++;
    const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);

    if (ew.is(travelTo, Empty.TYPE_DEF)) {
      ew.swap(travelTo);
      console.log(this.direction);
    } else {
      this.direction = Utils.oneIn(2) ? Wayfinder.turnRight(this.direction) : Wayfinder.turnLeft(this.direction);
    }

    if (this.counter % this.max == 0) {
      this.counter = 0;
      this.direction = Utils.oneIn(2) ? Wayfinder.veerRight(this.direction) : Wayfinder.veerLeft(this.direction);
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
FlyingEnemy.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(FlyingEnemy.TYPE_DEF);
