import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { EmptyElement } from "./EmptyElement";
import { ResElement } from "./ResElement";
import { Atom } from "../Atom";

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
    //get a random NESW site
    const availableSite: Site = ew.getAdjacent4Way();

    //CREATION
    if (availableSite.atom.type === ElementTypes.EMPTY) {
      const createDReg: boolean = Math.random() * this.pTOTAL_CHANCE < this.pDREG_CREATE;
      const createRes: boolean = Math.random() * this.pTOTAL_CHANCE < this.pRES_CREATE;

      if (createDReg) {
        availableSite.atom = new Atom(ElementTypes.DREG);
        console.log("DREG CREATED");
      } else if (createRes) {
        //make res
        availableSite.atom = new Atom(ElementTypes.RES);
        console.log("RES CREATED");
      }

      ew.origin.swapAtoms(availableSite);
    } else if (availableSite.atom.type === ElementTypes.DREG) {
      const destroyDReg: boolean = Math.random() * this.pTOTAL_CHANCE < this.pDREG_DESTROY;

      if (destroyDReg) {
        availableSite.atom = new Atom(ElementTypes.EMPTY);
        console.log("DREG DESTROYED");
        ew.origin.swapAtoms(availableSite);
      }
    } else {
      //it's something else
      const destroyAny: boolean = Math.random() * this.pTOTAL_CHANCE < this.pANY_DESTROY;

      if (destroyAny) {
        console.log(availableSite.atom.type.name + " DESTROYED");
        availableSite.atom = new Atom(ElementTypes.EMPTY);
        ew.origin.swapAtoms(availableSite);
      }
    }

    super.exec(ew);
  }
}
