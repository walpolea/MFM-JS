import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType, ElementTypes } from "../ElementTypes";
import { Utils } from "../../utils/MFMUtils";
import { Empty } from "./EmptyElement";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class Data extends Elem {

  static TYPE_DEF: IElementType = { name: "DATA", type: "Da", class: Data, color: 0xcccccc };
  static CREATE = Data.CREATOR();

  pPATROL: number = 1;

  initializedData: boolean = false;
  datas: any[]

  constructor(_datas: any[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    super(Data.TYPE_DEF);
    this.datas = _datas;
  }
  exec(ew: EventWindow) {

    if (!this.initializedData) {
      if (ew.origin.atom.data === undefined) {
        ew.origin.atom.data = {};
      }
      const val = this.datas[(this.datas.length * Math.random()) >> 0];
      console.log(val);
      ew.origin.atom.data.value = val;
      this.initializedData = true;
    }

    this.color = Utils.rgbToHex((ew.origin.atom.data.value) * 5, (ew.origin.atom.data.value) * 5, (ew.origin.atom.data.value) * 5);

    //patrol
    if (Utils.oneIn(this.pPATROL)) {
      //ew.origin.swapAtoms(ew.getAdjacent8Way(Empty.TYPE_DEF));
      if (Utils.oneIn(2) && ew.is(4, Empty.TYPE_DEF)) {
        ew.move(4);
      } else {
        ew.move(ew.getIndexes(EventWindow.ADJACENT4WAY, Empty.TYPE_DEF, true)[0]);
      }

    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Data.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Data.TYPE_DEF);