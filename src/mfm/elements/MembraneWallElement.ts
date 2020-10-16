import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Empty } from "./EmptyElement";
import { SwapWorm } from "./SwapWormElement";
import { StuckMembrane } from "./StuckMembraneElement";
import { Data } from "./DataElement";

export class MembraneWall extends Element {
  static BASE_TYPE: IElementType = { name: "MEMBRANEWALL", symbol: "Mw", class: MembraneWall, color: 0x2020ff };
  static CREATE = MembraneWall.CREATOR();

  static SW_XL = MembraneWall.CREATOR({ params: [1, [...EventWindow.LAYER1, ...EventWindow.LAYER2, EventWindow.LAYER3]] });
  static SW_LRG = MembraneWall.CREATOR({ params: [1, [...EventWindow.LAYER1, ...EventWindow.LAYER2]] });
  static SW_MED = MembraneWall.CREATOR();
  static SW_SM = MembraneWall.CREATOR({ params: [1, EventWindow.ADJACENT4WAY] });

  static D_SM = MembraneWall.CREATOR({ params: [1, EventWindow.ADJACENT4WAY, Data.BASE_TYPE] });
  static D_MED = MembraneWall.CREATOR({ params: [1, EventWindow.ADJACENT8WAY, Data.BASE_TYPE] });
  static D_LRG = MembraneWall.CREATOR({ params: [1, [...EventWindow.LAYER1, ...EventWindow.LAYER2], Data.BASE_TYPE] });

  activated: boolean = true;
  density: number;
  spread: number[];
  deactivationType: IElementType;

  constructor(membraneDensity: number = 1, membraneSpread: number[] = EventWindow.ADJACENT8WAY, deactivationType: IElementType = SwapWorm.BASE_TYPE) {
    super(MembraneWall.BASE_TYPE, 0, 100);

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

    if (this.activated && ew.getRandomIndexOfType(this.spread, Empty.BASE_TYPE)) {
      ew.mutate(ew.getRandomIndexOfType(this.spread, Empty.BASE_TYPE), StuckMembrane.CREATE({ params: [MembraneWall.BASE_TYPE, 2] }, undefined, 0x3222a8));
      //ew.mutate(ew.getRandomIndexOfType(this.spread, Empty.BASE_TYPE), StickyMembrane.CREATE({params: [MembraneWall.BASE_TYPE, this.density, 1]}, undefined, 0x3222a8));
    } else if (!this.activated) {
      ew.getIndexes(EventWindow.ALLADJACENT, StuckMembrane.BASE_TYPE, false).forEach((site) => {
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
ElementRegistry.registerType(MembraneWall.BASE_TYPE);
