//For the time being, you need to add your Element here to make it show up in the GUI
import { Mason } from "./elements/MasonElement";
import { Empty } from "./elements/EmptyElement";
import { SwapWorm } from "./elements/SwapWormElement";
import { StickyMembrane } from "./elements/StickyMembraneElement";
import { Res } from "./elements/ResElement";
import { DReg } from "./elements/DRegElement";
import { Wall } from "./elements/WallElement";
import { ForkBomb } from "./elements/ForkBombElement";
import { SuperForkBomb } from "./elements/SuperForkBomb";
import { AntiForkBomb } from "./elements/AntiForkBombElement";
import { Sentry } from "./elements/SentryElement";
import { Data } from "./elements/DataElement";
import { Reducer } from "./elements/ReducerElement";
import { LoopWorm } from "./elements/LoopWormElement";
import { LoopSeed } from "./elements/LoopSeedElement";
import { Writer } from "./elements/WriterElement";
import { Sorter } from "./elements/SorterElement";
import { SortMaster } from "./elements/SortMasterElement";
import { Template } from "./elements/TemplateElement";
import { SuperMason } from "./elements/SuperMasonElement";
import { StuckMembrane } from "./elements/StuckMembraneElement";
import { Input } from "./elements/InputElement";
import { Keyboard } from "./elements/KeyboardElement";
import { BasePlanter } from "./elements/BasePlanterElement";
import { Text } from "./elements/TextElement";
import { Reader } from "./elements/ReaderElement";
import { RevolvingDoor } from "./elements/RevolvingDoorElement";
import { OnewayDoor } from "./elements/OnewayDoorElement";
import { MembraneWall } from "./elements/MembraneWallElement";
import { MembraneDoor } from "./elements/MembraneDoorElement";
import { Eraser } from "./elements/EraserElement";
import { Sand } from "./elements/SandElement";
import { Water } from "./elements/WaterElement";
import { DecayWall } from "./elements/DecayWallElement";
import { GridBuilder } from "./elements/GridBuilderElement";
import { Builder } from "./elements/BuilderElement";
import { Builders } from "./elements/Builders";
import { SPLAT } from "./utils/SPLAT";
import { SwapLine } from "./elements/SwapLineElement";
import { Emitters } from "./elements/Emitters";
import { CellMembrane } from "./elements/CellMembraneElement";
import { CellBrane } from "./elements/CellBraneElement";
import { CellOuterMembrane } from "./elements/CellOuterMembraneElement";
import { Sonar } from "./elements/SonarElement";
import { DirectionalTraveler } from "./elements/DirectionalTravelerElement";
import { Fly } from "./elements/FlyElement";
import { Looper } from "./elements/LooperElement";
import { LoopMason } from "./elements/LoopMason";
import { Networker } from "./elements/NetworkerElement";
import { Player } from "./elements/game/Player";
import { Goal } from "./elements/game/Goal";
import { Enemy } from "./elements/game/Enemy";
import { Clearer } from "./elements/game/Clearer";
import { PlayerEmitter } from "./elements/game/PlayerEmitter";
import { FlyingEnemy } from "./elements/game/FlyingEnemy";
import { Dirt } from "./elements/game/Dirt";
import { Mosquito } from "./elements/MosquitoElement";
import { Director } from "./elements/DirectorElement";

//[Mason, SuperMason, StuckMembrane, Input, Data, Reader, Keyboard, BasePlanter, Text, Empty, SwapWorm, StickyMembrane, Res, DReg, Wall, ForkBomb, SuperForkBomb, AntiForkBomb, Sentry, Data, Reducer, LoopWorm, LoopSeed, Writer, SortMaster, Sorter, Template, RevolvingDoor, OnewayDoor];

export class ElementIncludes {
  static ELEMENT_MENU_MAP: Map<string, [string, Function][]> = new Map<string, [string, Function][]>()
    .set("MFM", [
      ["Empty", Empty.CREATE],
      ["DReg", DReg.CREATE],
      ["Res", Res.CREATE],
      ["Blue Res", Res.CREATE_BLUE],
      ["ForkBomb", ForkBomb.CREATE],
      ["SuperForkbomb", SuperForkBomb.CREATE],
      ["AntiForkBomb", AntiForkBomb.CREATE],
      ["Sentry", Sentry.CREATE],
      ["SwapLine", SwapLine.CREATE],
      ["SL E", Builders.VLINE_SL_E],
      ["SL W", Builders.VLINE_SL_W],
      ["SL N", Builders.HLINE_SL_N],
      ["SL S", Builders.HLINE_SL_S],
      ["SL NW", Builders.DLINE_SL_NW],
      ["SL NE", Builders.DLINE_SL_NE],
      ["SL SW", Builders.DLINE_SL_SW],
      ["SL SE", Builders.DLINE_SL_SE],
      ["SL E Em", Emitters.SWAPLINE_E],
      ["SL W Em", Emitters.SWAPLINE_W],
      ["SL N Em", Emitters.SWAPLINE_N],
      ["SL S Em", Emitters.SWAPLINE_S],
    ])
    .set("Structural", [
      ["Director E", Director.DIRECTOR_EAST],
      ["Director W", Director.DIRECTOR_WEST],
      ["Director N", Director.DIRECTOR_NORTH],
      ["Director S", Director.DIRECTOR_SOUTH],
      ["Wall", Wall.CREATE],
      ["Soft Wall", Wall.SOFT_WALL],
      ["Loop Mason", LoopMason.CREATE],
      ["Mason", Mason.CREATE],
      ["Super Mason", SuperMason.CREATE],
      // ["Super Mason Random", SuperMason.RANDOM_CREATE],
      ["MembraneWall", MembraneWall.CREATE],
      ["MembraneWallXL", MembraneWall.SW_XL],
      ["MembraneWallLrg", MembraneWall.SW_LRG],
      ["MembraneDataWall", MembraneWall.D_MED],
      ["MembraneDataWallLrg", MembraneWall.D_LRG],
      ["DecayWall-10", DecayWall.CREATE],
      ["DecayWall-100", DecayWall.LIVE_100],
      ["DecayWall-1000", DecayWall.LIVE_1000],
      ["Grid Builder", GridBuilder.CREATE],
      ["Wall Grid", GridBuilder.GRID_WALL],
      ["Sorter Grid", GridBuilder.GRID_SORTER],
      ["Data Grid", GridBuilder.GRID_DATA],
      ["DecayWall Grid", GridBuilder.CREATOR({ params: [DecayWall.LIVE_100] })],
      ["Builder", Builder.CREATE],
      ["Fun", Builders.LOOP],
      ["CA", Builders.CA],
      ["H Wall", Builders.HLINE],
      ["V Wall", Builders.VLINE],
      ["SE Diag Wall", Builders.DLINE_SE],
      ["NE Diag Wall", Builders.DLINE_NE],
      ["V DecayWall", Builders.VDLINE],
      ["H DecayWall", Builders.HDLINE],
    ])
    .set("Doors", [
      ["Revolving Door", RevolvingDoor.CREATE],
      ["W→NES", OnewayDoor.CREATE],
      ["W→E", OnewayDoor.W_E],
      ["N→S", OnewayDoor.N_S],
      ["S→N", OnewayDoor.S_N],
      ["E→W", OnewayDoor.E_W],
      ["⬋ E→S", OnewayDoor.E_S],
      ["⬊ N→E", OnewayDoor.N_E],
      ["⬈ W→N", OnewayDoor.W_N],
      ["⬉ S→W", OnewayDoor.S_W],
      ["⬈ S→E", OnewayDoor.S_E],
      ["⬉ E→N", OnewayDoor.E_N],
      ["⬋ N→W", OnewayDoor.N_W],
      ["⬊ W→S", OnewayDoor.W_S],
      ["W→NS", OnewayDoor.W_NS],
      ["E→NS", OnewayDoor.E_NS],
      ["S→EW", OnewayDoor.S_EW],
      ["N→EW", OnewayDoor.N_EW],
      ["W→NE", OnewayDoor.W_NE],
      ["N→WSE", OnewayDoor.N_WSE],
      ["WNE→S", OnewayDoor.WNE_S],
    ])
    .set("Goopy Stuff", [
      ["CellBrane", CellBrane.CREATE],
      ["CellMembrane", CellMembrane.CREATE],
      ["CellOuterMembrane", CellOuterMembrane.CREATE],
      ["CellBrane (NO COLOR)", CellBrane.CREATOR({ params: [false] })],
      ["CellMembrane (NO COLOR)", CellMembrane.CREATOR({ params: [false] })],
      ["StickyMembrane", StickyMembrane.CREATE],
      ["StickyMembrane Emitter", Emitters.STICKYMEMBRANE],
      ["StuckMembrane", StuckMembrane.CREATE],
      ["Fireworks (Template)", Template.CREATE],
    ])
    .set("Worms", [
      ["SwapWorm", SwapWorm.CREATE],
      ["Long SW", SwapWorm.CREATOR({ params: [24] })],
      ["Short SW", SwapWorm.CREATOR({ params: [1] })],
      ["Super SW", SwapWorm.CREATOR({ params: [255] })],
      ["SW Emitter", Emitters.SWAPWORM],
      ["LoopWorm", LoopWorm.CREATE],
      ["LoopSeed", LoopSeed.CREATE],
      ["Networker", Networker.CREATE],
    ])
    .set("Data Stuff", [
      ["Data", Data.CREATE],
      ["Data Emitter", Emitters.DATA_STREAM],
      ["Sorter", Sorter.CREATE],
      ["Sorter Emitter", Emitters.SORTER],
      ["SortMaster", SortMaster.CREATE],
      ["Input", Input.CREATE],
      ["Reducer", Reducer.CREATE],
    ])
    .set("Game", [
      ["Player", Player.CREATE],
      ["PlayerEmitter", PlayerEmitter.CREATE],
      ["Goal", Goal.CREATE],
      ["Enemy", Enemy.CREATE],
      ["FlyingEnemy", FlyingEnemy.CREATE],
      ["Clearer", Clearer.CREATE],
      ["Dirt", Dirt.CREATE],
      ["Dirt HLine", Builders.DIRT_HLINE],
      ["Dirt VLine", Builders.DIRT_VLINE],
    ])
    .set("Input", [
      ["KeyboardPlanter", BasePlanter.CREATE],
      ["Reader", Reader.CREATE],
      ["Writer", Writer.CREATE],
      ["Text", Text.CREATE],
    ])
    .set("Misc", [
      ["Directional", DirectionalTraveler.CREATE],
      ["Looper", Looper.CREATE],
      ["Looper EAST", Looper.CREATE_EAST],
      ["Sonar", Sonar.CREATE],
      ["Sonar Blue", Sonar.CREATE_BLUE],
      ["Eraser", Eraser.CREATE],
    ])
    .set("Sandbox Stuff", [
      ["Fly", Fly.CREATE],
      ["Mosquito", Mosquito.CREATE],
      ["Sand", Sand.CREATE],
      ["Water", Water.CREATE],
      ["Sand Grid", GridBuilder.GRID_SAND],
      ["Water Grid", GridBuilder.CREATOR({ name: "WATER GRID", params: [Water.CREATE] })],
    ]);
}
