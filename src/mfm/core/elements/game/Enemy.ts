import { EventWindow, EWIndex } from "../../EventWindow";
import { Elem } from "../../Elem";
import { IElementType } from "../../IElementType";
import { ElementTypes } from "../../ElementTypes";
import { Empty } from "../EmptyElement";
import { Utils } from "../../../utils/MFMUtils";
import { Atom } from "../../Atom";
import { Wayfinder, Direction } from "../../../utils/MFMWayfinder";
import { DecayWall } from "../DecayWallElement";
import { Player } from "./Player";
import { Wall } from "../WallElement";
import { Actions } from "../../../utils/MFMActions";

export class Enemy extends Elem {
  static TYPE_DEF: IElementType = { name: "Enemy", type: "En", class: Enemy, color: 0xff224f };
  static CREATE = Enemy.CREATOR();

  
  constructor() {
    super(Enemy.TYPE_DEF);
    
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

    Actions.patrol(ew);
    

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Enemy.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Enemy.TYPE_DEF);
