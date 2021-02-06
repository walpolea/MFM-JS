import { EventWindow, EWIndex } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { Empty } from "./EmptyElement";
import { Wayfinder, Direction } from "../utils/MFMWayfinder";
import { DecayDirector } from "./DecayDirectorElement";
import { QDirectional } from "./quarks/QDirectional";
import { DecayWall } from "./DecayWallElement";
import { Wall } from "./WallElement";
import { DirectionalData } from "./DirectionalData";
import { HiveAccountant } from "./HiveAccountantElement";

export interface HiveSorter extends QDirectional {}

export class HiveSorter extends Element {
  static BASE_TYPE: IElementType = { name: "HIVESORTER", symbol: "Hs", class: HiveSorter, color: 0x574b31 };
  static CREATE = HiveSorter.CREATOR();
  static CREATE_EAST = HiveSorter.CREATOR({ name: "HSEAST", params: ["E"] });
  static CREATE_WEST = HiveSorter.CREATOR({ name: "HSWEST", params: ["W"] });
  static CREATE_NORTH = HiveSorter.CREATOR({ params: ["N"] });
  static CREATE_SOUTH = HiveSorter.CREATOR({ params: ["S"] });

  counter: number = 0;
  turns: number = 0;
  rotations: number = 0;
  max: number;
  isCollecting: boolean = false;
  isSorting: boolean = false;

  constructor(_direction?: Direction, _max?: number) {
    super(HiveSorter.BASE_TYPE);

    this.setRandomDirection();
    this.max = _max ? _max : 5;
  }

  checkForData(ew: EventWindow): boolean {
    const outerSites: EWIndex[] = Wayfinder.getInFront(Wayfinder.turnLeft(this.direction), true);
    return ew.any(outerSites, DirectionalData.BASE_TYPE);
  }

  makePlaceholders(ew: EventWindow) {
    const innerDirection: Direction = Wayfinder.turnRight(this.direction);
    const innerFurthestSite: EWIndex = Wayfinder.getInFront(innerDirection).slice(-1)[0];

    if (ew.is(innerFurthestSite, Empty.BASE_TYPE) && this.counter % this.max === 0) {
      ew.mutate(innerFurthestSite, Wall.CREATE());
    }
  }

  makeSorters(ew: EventWindow) {
    const innerDirection: Direction = Wayfinder.turnRight(this.direction);
    const innerFurthestSite: EWIndex = Wayfinder.getInFront(innerDirection).slice(-1)[0];

    if (ew.is(innerFurthestSite, [Empty.BASE_TYPE, Wall.BASE_TYPE]) && this.counter % this.max === 0) {
      ew.mutate(innerFurthestSite, HiveAccountant.CREATE());
    }
  }

  setSortersToDirect(ew: EventWindow) {
    const sorters = ew.getSites(EventWindow.ALLADJACENT, HiveAccountant.BASE_TYPE, false);

    sorters.forEach((s) => {
      (s.atom?.elem as HiveAccountant).isDirecting = true;
    });
  }

  moveAndMakeDecayDirectors(ew: EventWindow) {
    const forceDirection: Direction = Wayfinder.turnRight(this.direction);
    const directorColor: number = 0xf2c25a;
    const emitBeforeAge: number = 1;
    //for every other move, make a short/long lived director
    const directorLifeSpan = this.counter % 2 ? 5 : 100;

    const makeDecayDirector: Function = DecayDirector.CREATOR(
      { params: [forceDirection, directorLifeSpan, EventWindow.ALLADJACENT, emitBeforeAge] },
      undefined,
      directorColor
    );

    if (this.moveDirectionally(ew, [Empty.BASE_TYPE, DecayDirector.BASE_TYPE], makeDecayDirector())) {
      this.keepOnTurning();
    }
  }

  moveOnly(ew: EventWindow) {
    const outishSite: EWIndex = Wayfinder.getDirectionalMove(Wayfinder.slightLeft(this.direction), true);
    const outerSites: EWIndex[] = [outishSite, ...Wayfinder.getInFront(Wayfinder.turnLeft(this.direction), true)];

    outerSites.forEach((s) => {
      if (ew.is(s, [Empty.BASE_TYPE, DecayWall.BASE_TYPE])) {
        ew.mutate(s, DecayWall.CREATE({ params: [150] }));
      }
    });

    if (this.moveDirectionally(ew, [Empty.BASE_TYPE, DecayDirector.BASE_TYPE, DecayWall.BASE_TYPE], DecayWall.CREATE({ params: [100] }))) {
      this.keepOnTurning();
    }
  }

  keepOnTurning() {
    this.counter++;

    if (this.counter % this.max === 0) {
      this.turns++;
      this.counter = 0;
      this.direction = Wayfinder.veerRight(this.direction);
    }

    if (this.turns === 8) {
      this.rotations++;
      this.turns = 0;
    }
  }

  exec(ew: EventWindow) {
    const dataNearby: boolean = this.checkForData(ew);

    if (dataNearby) {
      this.rotations = 0;
    }

    // console.log(this.isCollecting, this.rotations);

    if (!this.isSorting) {
      this.makeSorters(ew);
      this.moveAndMakeDecayDirectors(ew);
    } else {
      this.setSortersToDirect(ew);
      this.moveOnly(ew);
    }

    if (this.rotations >= 10) {
      this.isCollecting = false;
      this.isSorting = true;
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
HiveSorter.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists

Element.applyMixins(HiveSorter, [QDirectional]);
