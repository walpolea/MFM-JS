import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";

export class DRegEl extends Elem {
  pDREG_CREATE: number;
  pRES_CREATE: number;
  pDREG_DESTROY: number;
  pANY_DESTROY: number;

  constructor() {
    super(ElementTypes.D_REG.name, ElementTypes.D_REG.type);

    this.pDREG_CREATE = 1000;
    this.pRES_CREATE = 200;
    this.pDREG_DESTROY = 10;
    this.pANY_DESTROY = 100;
  }

  exec(ew: EventWindow) {
    let createDReg: boolean = !(Math.ceil(Math.random() * this.pDREG_CREATE) % this.pDREG_CREATE);

    if (createDReg) {
      //ew.

      ew.getEast().elem = new DRegEl();
    }

    let dir = Math.floor(Math.random() * 4);

    switch (dir) {
      case 0:
        if (ew.getWest()) {
          ew.origin.site.swapAtoms(ew.getWest().site);
        }
        break;
      case 1:
        if (ew.getEast()) {
          ew.origin.site.swapAtoms(ew.getEast().site);
        }
        break;
      case 2:
        if (ew.getNorth()) {
          ew.origin.site.swapAtoms(ew.getNorth().site);
        }
        break;
      case 3:
        if (ew.getSouth()) {
          ew.origin.site.swapAtoms(ew.getSouth().site);
        }
        break;
    }

    let n: number = Math.random() * 10;

    // switch(n) {
    // case 0:
    // case 1:
    // case 2:
    //     if( ew.r && ew.r.atom.type == 0 ) {
    //     ew.r.atom.setType(2);
    //     }
    // break;

    // default:
    //     if( ew.r && ew.r.atom.type != 4) {
    //     ew.r.atom.setType(0);
    //     }
    //     break;

    // }
    super.exec(ew);
  }
}
