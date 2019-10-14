import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType, ElementTypes } from "../ElementTypes";
import { Utils } from "../../utils/MFMUtils";
import { SPLAT } from "../../utils/SPLAT";
import { Empty } from "./EmptyElement";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class Data extends Elem {

  static TYPE_DEF: IElementType = { name: "DATA", type: "Da", class: Data, color: 0xcccccc };
  static CREATE = Data.CREATOR();


  static dataNearby = SPLAT.splatToMap(`
    ###
    #@#
    ###
  `)

  pPATROL: number = 1;

  initializedData: boolean = false;
  initialData: any;

  constructor(_initialData: any = undefined) {
    super(Data.TYPE_DEF);
    this.initialData = _initialData;
  }
  exec(ew: EventWindow) {

    if (!this.initializedData) {

      if (ew.origin.atom.data === undefined) {
        ew.origin.atom.data = {};

        if (this.initialData) {
          ew.origin.atom.data.value = this.initialData;
        } else {
          //Default 0 to 40
          ew.origin.atom.data.value = Math.random() * 40 >> 0;
        }

      }

      this.initializedData = true;
    }

    this.color = Utils.rgbToHex((ew.origin.atom.data.value) * 5, (ew.origin.atom.data.value) * 5, (ew.origin.atom.data.value) * 5);

    //const datanearby = ew.query(Data.dataNearby, 1, Data.SPLAT_MAP);
    //patrol
    if (Utils.oneIn(this.pPATROL)) {
      ew.origin.swapAtoms(ew.getAdjacent8Way(Empty.TYPE_DEF));
      // if (Utils.oneIn(2) && ew.is(4, Empty.TYPE_DEF)) {
      //   ew.move(4);
      // } else {
      //   ew.move(ew.getIndexes(EventWindow.ADJACENT4WAY, Empty.TYPE_DEF, true)[0]);
      // }

    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Data.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(Data.TYPE_DEF);