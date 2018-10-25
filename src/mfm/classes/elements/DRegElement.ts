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

    const availableSite: Site = ew.getAdjacent4Way();

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

    //move to random empty
    ew.origin.swapAtoms(ew.getRandom(ElementTypes.EMPTY));

    super.exec(ew);
  }
}
