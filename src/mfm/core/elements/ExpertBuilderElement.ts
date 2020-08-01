import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { SPLAT } from "../../utils/SPLAT";
import { Empty } from "./EmptyElement";
import { Actions } from "../../utils/MFMActions";
import { Symmetries } from "../../utils/Symmetries";

export class ExpertBuilder extends Elem {
  static TYPE_DEF: IElementType = { name: "EXPERT BUILDER", type: "Xb", class: ExpertBuilder, color: 0x44ccaa };
  static CREATE = ExpertBuilder.CREATOR();

  buildPaths: Map<number, string>[];
  buildSyms: Map<number, number>[][];
  curPath: number = 0;
  curSym: number = 0;
  buildStep: number;
  atomizer: Function;

  constructor(
    _atomizer: Function = undefined,
    _buildPaths: Map<number, string>[] = [SPLAT.MAP_E, SPLAT.MAP_S],
    _buildSyms: Map<number, number>[][] = [Symmetries.NORMAL],
    _buildStep: number = 0,
    _curPath: number = 0,
    _curSym: number = 0
  ) {
    super(ExpertBuilder.TYPE_DEF);
    this.atomizer = _atomizer;
    this.buildPaths = _buildPaths;
    this.buildSyms = _buildSyms;
    this.curPath = _curPath;
    this.curSym = _curSym;
  }

  exec(ew: EventWindow) {
    if (this.atomizer) {
      this.buildStep++;
      this.curSym = ++this.curSym % this.buildSyms.length;
      this.curPath = ++this.curPath % this.buildPaths.length;

      const result = ew.query(this.buildPaths[this.curPath], 1, ExpertBuilder.SPLAT_MAP, this.buildSyms[this.curSym]);

      if (result) {
        result.get(Empty.TYPE_DEF).forEach((empty) => {
          //replace empties with more of me
          ew.mutate(empty, ExpertBuilder.CREATE([this.atomizer, this.buildPaths, this.buildSyms, this.buildStep, this.curPath, this.curSym]));

          //store a copy of me in the baseLayer
          ew.mutateBase(ExpertBuilder.CREATE([this.atomizer, this.buildPaths, this.buildSyms, this.buildStep]));
        });
      }
      //replace myself with the thing I build
      ew.mutate(0, this.atomizer());
    } else {
      const baseAtom = ew.readBase();
      if (baseAtom.is(ExpertBuilder.TYPE_DEF)) {
        this.atomizer = (baseAtom.elem as ExpertBuilder).atomizer;
        this.buildPaths = (baseAtom.elem as ExpertBuilder).buildPaths;
        this.buildSyms = (baseAtom.elem as ExpertBuilder).buildSyms;
        this.buildStep = (baseAtom.elem as ExpertBuilder).buildStep;
      } else {
        Actions.patrol(ew, EventWindow.ADJACENT8WAY);
      }
    }
  }
}

ExpertBuilder.INITIALIZE_SPLAT_MAP()();
ElementTypes.registerType(ExpertBuilder.TYPE_DEF);
