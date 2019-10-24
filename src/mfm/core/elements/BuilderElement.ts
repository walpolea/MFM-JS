import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Sorter } from "./SorterElement";
import { SPLAT } from "../../utils/SPLAT";
import { Empty } from "./EmptyElement";
import { Wall } from "./WallElement";
import { Sand } from "./SandElement";
import { Data } from "./DataElement";
import { Actions } from "../../utils/MFMActions";
import { Symmetries } from "../../utils/Symmetries";

export class Builder extends Elem {

  static TYPE_DEF: IElementType = { name: "BUILDER", type: "Bd", class: Builder, color: 0x44ccaa };
  static CREATE = Builder.CREATOR();


  buildPath: Map<number, string>;
  buildSym: Map<number, number>[];
  buildStep: number;
  atomizer: Function;

  constructor(_atomizer: Function = undefined, _buildPath: Map<number, string> = SPLAT.splatToMap(`_@_`), _buildSym: Map<number, number>[] = Symmetries.NORMAL, _buildStep: number = 0) {
    super(Builder.TYPE_DEF);
    this.atomizer = _atomizer;
    this.buildPath = _buildPath;
    this.buildSym = _buildSym;
  }

  exec(ew: EventWindow) {

    if (this.atomizer) {
      this.buildStep++;
      const result = ew.query(this.buildPath, 1, Builder.SPLAT_MAP, this.buildSym);

      if (result) {
        result.get(Empty.TYPE_DEF).forEach(empty => {
          //replace empties with more of me
          ew.mutate(empty, Builder.CREATE([this.atomizer, this.buildPath, this.buildSym, this.buildStep]));

          //store a copy of me in the baseLayer
          ew.mutateBase(Builder.CREATE([this.atomizer, this.buildPath, this.buildSym, this.buildStep]));
        });
      }
      //replace myself with the thing I build
      ew.mutate(0, this.atomizer());
    } else {

      const baseAtom = ew.readBase();
      if (baseAtom.is(Builder.TYPE_DEF)) {
        this.atomizer = (baseAtom.elem as Builder).atomizer;
        this.buildPath = (baseAtom.elem as Builder).buildPath;
        this.buildSym = (baseAtom.elem as Builder).buildSym;
        this.buildStep = (baseAtom.elem as Builder).buildStep;
      } else {
        Actions.patrol(ew, EventWindow.ADJACENT8WAY);
      }
    }




  }

}

Builder.INITIALIZE_SPLAT_MAP()();
ElementTypes.registerType(Builder.TYPE_DEF);
