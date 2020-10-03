import { EventWindow, EWIndex } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Empty } from "./EmptyElement";
import { Utils } from "../../utils/MFMUtils";
import { Atom } from "../Atom";
import { Wayfinder, Direction } from "../../utils/MFMWayfinder";
import { DecayWall } from "./DecayWallElement";
import { Pathway } from "./Pathway";
import { Wall } from "./WallElement";

export class Networker extends Elem {
  static TYPE_DEF: IElementType = { name: "Networker", type: "Dt", class: Networker, color: 0xffffaa };
  static CREATE = Networker.CREATOR([Wall.TYPE_DEF]);
  static CREATE_EAST = Networker.CREATOR(["E"]);
  static CREATE_WEST = Networker.CREATOR(["W"]);
  static CREATE_NORTH = Networker.CREATOR(["N"]);
  static CREATE_SOUTH = Networker.CREATOR(["S"]);

  direction: Direction;
  counter = 0;
  max = 20;
  lookForType:IElementType;
  constructor(_lookForType:IElementType, _direction: Direction) {
    super(Networker.TYPE_DEF);
    this.lookForType = _lookForType;
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

  makeTrail( isTrailHead:boolean = false ): Atom {
    return Pathway.CREATE([this.direction, null, isTrailHead]);
  }

  exec(ew: EventWindow) {


    //look for

    const lookFors = ew.getNearestIndex(EventWindow.ALLADJACENT, this.lookForType);

    if( lookFors ) {
      const nearestPathway:number = ew.getNearestIndex(EventWindow.ALLADJACENT, Pathway.TYPE_DEF);
      if( nearestPathway ) {
        (ew.getSiteByIndex(nearestPathway).atom.elem as Pathway).isConnected = true;
      }
      ew.origin.die( this.makeTrail(true) );
    }

    const nearestPathway:number = ew.getNearestIndex(EventWindow.ADJACENT8WAY, Pathway.TYPE_DEF);

    if( nearestPathway && (ew.getSiteByIndex(nearestPathway).atom.elem as Pathway).isConnected ) {
      const p:Pathway = (ew.getSiteByIndex(nearestPathway).atom.elem as Pathway);
      this.direction = p.toDirection;
      ew.swap( nearestPathway );
      return;
    }

    const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);

    if (ew.is(travelTo, [Empty.TYPE_DEF, Pathway.TYPE_DEF])) {
        ew.move(travelTo, this.makeTrail( this.age < 1));
    } else {
      ew.origin.die();
      // if (Utils.oneIn(2)) {
      //   this.slightLeft();
      // } else {
      //   this.slightRight();
      // }
    }


    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Networker.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Networker.TYPE_DEF);
