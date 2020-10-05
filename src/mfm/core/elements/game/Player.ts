import { EventWindow, EWIndex } from "../../EventWindow";
import { Elem } from "../../Elem";
import { IElementType } from "../../IElementType";
import { ElementTypes } from "../../ElementTypes";
import { Empty } from "../EmptyElement";
import { Utils } from "../../../utils/MFMUtils";
import { Atom } from "../../Atom";
import { Wayfinder, Direction } from "../../../utils/MFMWayfinder";
import { DecayWall } from "../DecayWallElement";
import { Enemy } from "./Enemy";

export class Player extends Elem {
  static TYPE_DEF: IElementType = { name: "Player", type: "Pl", class: Player, color: 0xffff44 };
  static CREATE = Player.CREATOR();


  direction: Direction;
  counter = 0;
  max = 20;
  done = false;
  constructor() {
    super(Player.TYPE_DEF);
    this.direction = Wayfinder.DIRECTIONS[(Wayfinder.DIRECTIONS.length * Math.random()) >> 0];
  }

  reverse() {
    this.direction = Wayfinder.reverse(this.direction);
  }

  slightLeft() {
    this.direction = Wayfinder.slightLeft(this.direction);
  }

  slightRight() {
    this.direction = Wayfinder.slightRight(this.direction);
  }

  makeTrail(): Atom {
    return DecayWall.CREATE([5], undefined, [0x448888, 0x227777, 0x669999, 0x00bbbb][Math.random()*4 >> 0]);
  }

  finish() {
    this.done = true;
  }

  exec(ew: EventWindow) {

    if( !this.done ) {
      this.counter++;
      const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);

      const leftSite = Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.direction), true);
      const rightSite = Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.direction), true);

      if (ew.is(travelTo, Empty.TYPE_DEF)) {
        if (ew.is(leftSite, Empty.TYPE_DEF)) ew.mutate(leftSite, this.makeTrail());
        if (ew.is(rightSite, Empty.TYPE_DEF)) ew.mutate(rightSite, this.makeTrail());

        ew.move(travelTo, this.makeTrail());
      } 

      const nearbyPlayer = ew.getNearestIndex(EventWindow.ALLADJACENT, Player.TYPE_DEF);

      if( nearbyPlayer ) {
        const np:Player = ew.getSiteByIndex(nearbyPlayer).atom.elem as Player;
        np.direction = this.direction;
      }

      const nearbyEnemy = ew.getNearestIndex([...EventWindow.LAYER1, ...EventWindow.LAYER2], Enemy.TYPE_DEF);

      if( nearbyEnemy ) {

        if(Utils.oneIn(4) ) {
          (ew.getSiteByIndex(nearbyEnemy).atom.elem as Enemy).stun();
        } else if(Utils.oneIn(30)) {
          ew.destroy(nearbyEnemy);
        }

      }
      
    }
    
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Player.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Player.TYPE_DEF);
