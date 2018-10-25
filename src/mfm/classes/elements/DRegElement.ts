import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { EmptyElement } from "./EmptyElement";
import { ResElement } from "./ResElement";

export class DRegElement extends Elem {
  pDREG_CREATE: number;
  pRES_CREATE: number;
  pDREG_DESTROY: number;
  pANY_DESTROY: number;
  pTOTAL_CHANCE: number;

  constructor() {
    super(ElementTypes.DREG.name, ElementTypes.DREG.type);

    this.pTOTAL_CHANCE = 100;
    this.pDREG_CREATE = 0.1;
    this.pRES_CREATE = 0.5;
    this.pDREG_DESTROY = 10;
    this.pANY_DESTROY = 1;
  }

  exec(ew: EventWindow) {
    const createDReg: boolean = Math.random() * this.pTOTAL_CHANCE < this.pDREG_CREATE;
    const createRes: boolean = Math.random() * this.pTOTAL_CHANCE < this.pRES_CREATE;
    const destroyDReg: boolean = Math.random() * this.pTOTAL_CHANCE < this.pDREG_DESTROY;
    const destroyAny: boolean = Math.random() * this.pTOTAL_CHANCE < this.pANY_DESTROY;

    const availableSite: Site = ew.getRandom();

    if (createDReg) {
      availableSite.atom.elem = new DRegElement();
      console.log("DREG CREATED", availableSite);
    } else if (createRes) {
      //make res
      if (availableSite.atom.type === ElementTypes.EMPTY) {
        availableSite.atom.elem = new ResElement();
        console.log("RES CREATED", availableSite);
      }
    } else if (destroyDReg) {
      if (availableSite.atom.type === ElementTypes.DREG) {
        availableSite.atom.elem = new EmptyElement();
        console.log("DREG DESTROYED", availableSite);
      }
    } else if (destroyAny) {
      availableSite.atom.elem = new EmptyElement();
      console.log("ANY DESTROYED", availableSite);
    }

    //Move random
    let dir = Math.floor(Math.random() * 8);

    switch (dir) {
      case 0:
        if (ew.getWest()) {
          ew.origin.swapAtoms(ew.getWest());
        }
        break;
      case 1:
        if (ew.getEast()) {
          ew.origin.swapAtoms(ew.getEast());
        }
        break;
      case 2:
        if (ew.getNorth()) {
          ew.origin.swapAtoms(ew.getNorth());
        }
        break;
      case 3:
        if (ew.getSouth()) {
          ew.origin.swapAtoms(ew.getSouth());
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
