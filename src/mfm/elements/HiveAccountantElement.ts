import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { DirectionalData } from "./DirectionalData";
import { Site } from "../core/Site";
import { QDirector } from "./quarks/QDirector";
import { Direction, Wayfinder } from "../utils/MFMWayfinder";
import { QDirectional } from "./quarks/QDirectional";
import { QData } from "./quarks/QData";
import { HiveSorter } from "./HiveSorterElement";
import { DecayWall } from "./DecayWallElement";

export class HiveAccountant extends Element {
  static BASE_TYPE: IElementType = { name: "HIVEACCOUNTANT", symbol: "Ha", class: HiveAccountant, color: 0x30ceff };
  static CREATE = HiveAccountant.CREATOR();

  accountedData: Set<number> = new Set<number>();
  isDirecting: boolean = false;
  staleCounter: number = 0;

  constructor(_direction: Direction) {
    super(HiveAccountant.BASE_TYPE);
  }

  behave(ew: EventWindow) {
    const datas: Site[] = ew.getSites(EventWindow.ALLADJACENT, DirectionalData.BASE_TYPE, false);
    const undirectedDatas: Site[] = datas.filter((d) => {
      return !(d.atom?.elem as DirectionalData).isDirected;
    });

    if (undirectedDatas.length > 0) {
      this.staleCounter = 0;

      if (!this.isDirecting) {
        //ACCOUNTING

        undirectedDatas.forEach((d) => {
          this.accountedData.add(d.atom?.data?.value as number);
        });
      } else {
        //DIRECTING

        const sorted: number[] = Array.from(this.accountedData).sort((a, b) => a - b);
        const half = Math.ceil(sorted.length / 2);
        const midVal: number = sorted[half];

        console.log(sorted, midVal);

        undirectedDatas.forEach((d) => {
          const dd: QDirectional = d.atom?.elem as DirectionalData;

          if (d.atom?.data?.value < midVal) {
            dd.makeManipulable();
            dd.direct(Wayfinder.WEST);

            console.log(dd, d.atom?.data?.value, "SET WEST");
          } else if (d.atom?.data?.value >= midVal) {
            dd.makeManipulable();
            dd.direct(Wayfinder.EAST);
            console.log(dd, d.atom?.data?.value, "SET EAST");
          }

          // if (lowest.includes(d.atom?.data?.value as number)) {
          //   const dd: QDirectional = d.atom?.elem as DirectionalData;
          //   dd.makeManipulable();
          //   dd.direct(Wayfinder.EAST);
          // }

          // if (highest.includes(d.atom?.data?.value as number)) {
          //   const dd: QDirectional = d.atom?.elem as DirectionalData;
          //   dd.makeManipulable();
          //   dd.direct(Wayfinder.WEST);
          // }
        });

        this.isDirecting = false;
      }
    } else {
      this.staleCounter++;
    }

    if (this.staleCounter > 500) {
      //I think we're done, try to kill the HiveSorter
      const hiveSorters: number[] = ew.getIndexes(EventWindow.ALLADJACENT, HiveSorter.BASE_TYPE);

      if (hiveSorters.length > 0) {
        ew.destroy(hiveSorters[0]);
      }

      //No more walls around us, let's die
      const decayWalls = ew.getIndexes(EventWindow.ALLADJACENT, DecayWall.BASE_TYPE);

      if (!decayWalls.length) {
        ew.destroy();
      }
    }
  }

  exec(ew: EventWindow) {
    this.behave(ew);
    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
HiveAccountant.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
