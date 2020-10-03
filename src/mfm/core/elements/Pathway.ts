import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Direction, Wayfinder } from "../../utils/MFMWayfinder";

export class Pathway extends Elem {

  static TYPE_DEF: IElementType = { name: "Pathway", type: "Pw", class: Pathway, color: 0xff4040 };
  static CREATE = Pathway.CREATOR();



  toDirection:Direction;
  fromDirection:Direction;
  isConnected: boolean = false;
  isTrailhead:boolean = false;
  lifeSpan:number = 100;

  constructor(_toDirection:Direction, _fromDirection:Direction = undefined, _isTrailhead:boolean = false) {
    super(Pathway.TYPE_DEF, 0, 100);

    this.toDirection = _toDirection;
    this.fromDirection = _fromDirection ? _fromDirection : Wayfinder.DIRMAP_REVERSE.get(this.toDirection);
    this.isTrailhead = _isTrailhead;
  }

  checkPathIsConnected(ew:EventWindow):void {

    if( !this.isConnected && !this.isTrailhead && this.age > this.lifeSpan ) {
      ew.origin.die();
    }

    //if we can see a connected path, we are connected too.
    const to = Wayfinder.getDirectionalMove(this.toDirection);
    const from = Wayfinder.getDirectionalMove(this.fromDirection);

    if( !this.isTrailhead && to && ew.is(to, Pathway.TYPE_DEF) && (ew.getSiteByIndex(to).atom.elem as Pathway).isConnected ) {
      this.isConnected = true;
    }

    if( !this.isTrailhead && from && ew.is(from, Pathway.TYPE_DEF) && (ew.getSiteByIndex(from).atom.elem as Pathway).isConnected ) {
      this.isConnected = true;
    }

  }

  exec(ew: EventWindow) {

    if( this.isConnected ) {
      this.color = 0x40ff40;
    }

    if( this.isTrailhead ) {
      this.color = 0xffff40;

    }

    this.checkPathIsConnected(ew);


    // if( !this.isTrailhead && ew.getSites(EventWindow.ADJACENT8WAY, Pathway.TYPE_DEF).filter( s => (s?.atom?.elem as Pathway)?.isConnected )?.length > 0 ) {
    //   this.isConnected = true;
    // }


    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Pathway.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Pathway.TYPE_DEF);