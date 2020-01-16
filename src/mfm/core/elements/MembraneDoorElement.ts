import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Empty } from "./EmptyElement";
import { SwapWorm } from "./SwapWormElement";
import { StuckMembrane } from "./StuckMembraneElement";
import { Data } from "./DataElement";

export class MembraneDoor extends Elem {

  static TYPE_DEF: IElementType = { name: "MEMBRANE DOOR", type: "Md", class: MembraneDoor, color: 0x2020ff };
  static CREATE = MembraneDoor.CREATOR();

  static SW_XL = MembraneDoor.CREATOR([1, [...EventWindow.LAYER1, ...EventWindow.LAYER2, ...EventWindow.LAYER3, ...EventWindow.LAYER4]]);
  static SW_LRG = MembraneDoor.CREATOR([1, [...EventWindow.LAYER1, ...EventWindow.LAYER2]]);
  static SW_MED = MembraneDoor.CREATOR();
  static SW_SM = MembraneDoor.CREATOR([1, EventWindow.ADJACENT4WAY]);

  static D_SM = MembraneDoor.CREATOR([1, EventWindow.ADJACENT4WAY, Data.TYPE_DEF]);
  static D_MED = MembraneDoor.CREATOR([1, EventWindow.ADJACENT8WAY, Data.TYPE_DEF]);
  static D_LRG = MembraneDoor.CREATOR([1, [...EventWindow.LAYER1, ...EventWindow.LAYER2], Data.TYPE_DEF]);


  activated: boolean = true;
  density: number;
  spread: number[];

  openCycles: number = 0;
  closedCycles: number = 0;
  openCycleLimit: number;
  closedCycleLimit: number;

  constructor(membraneDensity: number = 1, membraneSpread: number[] = EventWindow.ADJACENT8WAY, openTime: number = 10, closedTime: number = 50) {

    super(MembraneDoor.TYPE_DEF, 0, 100);

    this.density = membraneDensity;
    this.spread = membraneSpread;

    this.openCycleLimit = openTime;
    this.closedCycleLimit = closedTime;
  }
  exec(ew: EventWindow) {

    if (this.activated && ew.getRandomIndexOfType(this.spread, Empty.TYPE_DEF)) {
      ew.mutate(ew.getRandomIndexOfType(this.spread, Empty.TYPE_DEF), StuckMembrane.CREATE([MembraneDoor.TYPE_DEF, 2], undefined, 0x3222a8));
    } else if (!this.activated) {
      ew.getIndexes(EventWindow.ALLADJACENT, StuckMembrane.TYPE_DEF, false).forEach(site => {
        if (site) {
          ew.destroy(site);
        }
      })
    }

    if (this.activated) {

      this.closedCycles++;

      if (this.closedCycles > this.closedCycleLimit) {

        this.activated = false;
        this.closedCycles = 0;
      }
    } else {
      ew.getAll(StuckMembrane.TYPE_DEF).filter(site => site).forEach(site => {
        site.killSelf();
      })

      this.openCycles++;

      if (this.openCycles > this.openCycleLimit) {

        this.activated = true;
        this.openCycles = 0;
      }
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
MembraneDoor.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(MembraneDoor.TYPE_DEF);