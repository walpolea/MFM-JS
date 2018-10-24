import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";

export class DRegEl extends Elem {
  pDREG_CREATE: number;
  pRES_CREATE: number;
  pDREG_DESTROY: number;
  pANY_DESTROY: number;

  constructor() {
    super("D_REG", "D");

    this.pDREG_CREATE = 1000;
    this.pRES_CREATE = 200;
    this.pDREG_DESTROY = 10;
    this.pANY_DESTROY = 100;
  }

  exec(ew: EventWindow) {
    let createDReg: boolean = !(Math.ceil(Math.random() * this.pDREG_CREATE) % this.pDREG_CREATE);

    if (createDReg) {
      //ew.
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
