import { Empty } from "./elements/EmptyElement";
import { DReg } from "./elements/DRegElement";
import { Res } from "./elements/ResElement";
import { Wall } from "./elements/WallElement";
import { Mason } from "./elements/MasonElement";
import { ForkBomb } from "./elements/ForkBombElement";
import { AntiForkBomb } from "./elements/AntiForkBombElement";
import { Sentry } from "./elements/SentryElement";
import { Data } from "./elements/DataElement";
import { Reducer } from "./elements/ReducerElement";
import { SuperMason } from "./elements/SuperMasonElement";
import { SuperForkBomb } from "./elements/SuperForkBomb";
import { SwapWorm } from "./elements/SwapWormElement";
import { LoopWorm } from "./elements/LoopWormElement";
import { LoopSeed } from "./elements/LoopSeedElement";
import { LoopNucleus } from "./elements/LoopNucleusElement";
import { StickyMembrane } from "./elements/StickyMembraneElement";
import { StuckMembrane } from "./elements/StuckMembraneElement";
import { MembraneWall } from "./elements/MembraneWallElement";
import { MembraneDoor } from "./elements/MembraneDoorElement";
import { Sorter } from "./elements/SorterElement";
import { SortMaster } from "./elements/SortMasterElement";
import { DecayWall } from "./elements/DecayWallElement";
import { Input } from "./elements/InputElement";
import { Text } from "./elements/TextElement";
import { Writer } from "./elements/WriterElement";
import { Eraser } from "./elements/EraserElement";
import { Keyboard } from "./elements/KeyboardElement";
import { BasePlanter } from "./elements/BasePlanterElement";
import { Reader } from "./elements/ReaderElement";

export interface IElementType {
  name: string;
  type: string;
  class: any;
  color?: number;
}

export class ElementTypes {

  //This is mostly for the GUI to know all the types it can make
  static TYPES_MAP: Map<string, IElementType> = new Map<string, IElementType>()
    .set(Empty.TYPE_DEF.name, Empty.TYPE_DEF)
    .set(DReg.TYPE_DEF.name, DReg.TYPE_DEF)
    .set(Res.TYPE_DEF.name, Res.TYPE_DEF)
    .set(Wall.TYPE_DEF.name, Wall.TYPE_DEF)
    .set(Mason.TYPE_DEF.name, Mason.TYPE_DEF)
    .set(MembraneWall.TYPE_DEF.name, MembraneWall.TYPE_DEF)
    .set(MembraneDoor.TYPE_DEF.name, MembraneDoor.TYPE_DEF)
    .set(SuperMason.TYPE_DEF.name, SuperMason.TYPE_DEF)
    .set(ForkBomb.TYPE_DEF.name, ForkBomb.TYPE_DEF)
    .set(SuperForkBomb.TYPE_DEF.name, SuperForkBomb.TYPE_DEF)
    .set(AntiForkBomb.TYPE_DEF.name, AntiForkBomb.TYPE_DEF)
    .set(Sentry.TYPE_DEF.name, Sentry.TYPE_DEF)
    .set(Data.TYPE_DEF.name, Data.TYPE_DEF)
    .set(Input.TYPE_DEF.name, Input.TYPE_DEF)
    .set(Reducer.TYPE_DEF.name, Reducer.TYPE_DEF)
    .set(LoopWorm.TYPE_DEF.name, LoopWorm.TYPE_DEF)
    .set(SwapWorm.TYPE_DEF.name, SwapWorm.TYPE_DEF)
    .set(LoopSeed.TYPE_DEF.name, LoopSeed.TYPE_DEF)
    .set(LoopNucleus.TYPE_DEF.name, LoopNucleus.TYPE_DEF)
    .set(StickyMembrane.TYPE_DEF.name, StickyMembrane.TYPE_DEF)
    .set(StuckMembrane.TYPE_DEF.name, StuckMembrane.TYPE_DEF)
    .set(Sorter.TYPE_DEF.name, Sorter.TYPE_DEF)
    .set(SortMaster.TYPE_DEF.name, SortMaster.TYPE_DEF)
    .set(DecayWall.TYPE_DEF.name, DecayWall.TYPE_DEF)
    .set(Text.TYPE_DEF.name, Text.TYPE_DEF)
    .set(Writer.TYPE_DEF.name, Writer.TYPE_DEF)
    .set(Eraser.TYPE_DEF.name, Eraser.TYPE_DEF)
    .set(Keyboard.TYPE_DEF.name, Keyboard.TYPE_DEF)
    .set(BasePlanter.TYPE_DEF.name, BasePlanter.TYPE_DEF)
    .set(Reader.TYPE_DEF.name, Reader.TYPE_DEF);

  static SPLAT_MAP: Map<string, IElementType> = new Map<string, IElementType>()
    .set("_", Empty.TYPE_DEF)
    .set("r", Res.TYPE_DEF)
    .set("d", DReg.TYPE_DEF)
    .set("w", Wall.TYPE_DEF)
    .set("*", StickyMembrane.TYPE_DEF);

  static registerType(name: string, type: string, c: any, color?: number, ) {
    this.TYPES_MAP.set(name, { name, type, class: c, color });
  }
}
