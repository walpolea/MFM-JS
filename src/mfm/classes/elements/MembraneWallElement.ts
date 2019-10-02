import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Atom } from "../Atom";
import { StickyMembrane } from "./StickyMembraneElement";
import { Empty } from "./EmptyElement";
import { SwapWorm } from "./SwapWormElement";

export class MembraneWall extends Elem {

  static TYPE_DEF: IElementType = { name: "MEMBRANE WALL", type: "Mw", class: MembraneWall, color: 0x2020ff };
  static CREATE = MembraneWall.CREATOR();

  activated: boolean = true;
  density: number;
  deactivationType: IElementType;

  constructor(membraneDensity: number = 1, deactivationType: IElementType = SwapWorm.TYPE_DEF) {

    super(MembraneWall.TYPE_DEF, 0, 100);

    this.density = membraneDensity;
    this.deactivationType = deactivationType;
  }
  exec(ew: EventWindow) {

    if (this.deactivationType && ew.getRandomIndexOfType(EventWindow.ALLADJACENT, this.deactivationType)) {
      this.activated = false;
    } else if (this.deactivationType) {

      this.activated = true;
    }

    if (this.activated && ew.getRandomIndexOfType(EventWindow.ADJACENT4WAY, Empty.TYPE_DEF)) {
      ew.mutate(ew.getRandomIndexOfType(EventWindow.ADJACENT4WAY, Empty.TYPE_DEF), StickyMembrane.CREATE([MembraneWall.TYPE_DEF, this.density, 1]));
    } else if (!this.activated) {
      ew.getIndexes(EventWindow.ALLADJACENT, StickyMembrane.TYPE_DEF, false).forEach(site => {
        if (site) {
          ew.destroy(site);
        }
      })

    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
MembraneWall.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(MembraneWall.TYPE_DEF);