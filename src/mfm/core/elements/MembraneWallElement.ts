import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Empty } from "./EmptyElement";
import { SwapWorm } from "./SwapWormElement";
import { StuckMembrane } from "./StuckMembraneElement";
import { Data } from "./DataElement";

export class MembraneWall extends Elem {
  static TYPE_DEF: IElementType = { name: "MEMBRANEWALL", type: "Mw", class: MembraneWall, color: 0x2020ff };
  static CREATE = MembraneWall.CREATOR();

  static SW_XL = MembraneWall.CREATOR([1, [...EventWindow.LAYER1, ...EventWindow.LAYER2, EventWindow.LAYER3]]);
  static SW_LRG = MembraneWall.CREATOR([1, [...EventWindow.LAYER1, ...EventWindow.LAYER2]]);
  static SW_MED = MembraneWall.CREATOR();
  static SW_SM = MembraneWall.CREATOR([1, EventWindow.ADJACENT4WAY]);

  static D_SM = MembraneWall.CREATOR([1, EventWindow.ADJACENT4WAY, Data.TYPE_DEF]);
  static D_MED = MembraneWall.CREATOR([1, EventWindow.ADJACENT8WAY, Data.TYPE_DEF]);
  static D_LRG = MembraneWall.CREATOR([1, [...EventWindow.LAYER1, ...EventWindow.LAYER2], Data.TYPE_DEF]);

  activated: boolean = true;
  density: number;
  spread: number[];
  deactivationType: IElementType;

  constructor(membraneDensity: number = 1, membraneSpread: number[] = EventWindow.ADJACENT8WAY, deactivationType: IElementType = SwapWorm.TYPE_DEF) {
    super(MembraneWall.TYPE_DEF, 0, 100);

    this.density = membraneDensity;
    this.spread = membraneSpread;
    this.deactivationType = deactivationType;
  }
  exec(ew: EventWindow) {
    if (this.deactivationType && ew.getRandomIndexOfType(EventWindow.LAYER4, this.deactivationType)) {
      this.activated = false;
    } else if (this.deactivationType) {
      this.activated = true;
    }

    if (this.activated && ew.getRandomIndexOfType(this.spread, Empty.TYPE_DEF)) {
      ew.mutate(ew.getRandomIndexOfType(this.spread, Empty.TYPE_DEF), StuckMembrane.CREATE([MembraneWall.TYPE_DEF, 2], undefined, 0x3222a8));
      //ew.mutate(ew.getRandomIndexOfType(this.spread, Empty.TYPE_DEF), StickyMembrane.CREATE([MembraneWall.TYPE_DEF, this.density, 1], undefined, 0x3222a8));
    } else if (!this.activated) {
      ew.getIndexes(EventWindow.ALLADJACENT, StuckMembrane.TYPE_DEF, false).forEach((site) => {
        if (site) {
          ew.destroy(site);
        }
      });
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
MembraneWall.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(MembraneWall.TYPE_DEF);
