import { EventWindow, EWIndex } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { QDirectional } from "./quarks/QDirectional";
import { Sand } from "./SandElement";
import { Empty } from "./EmptyElement";
import { DecayDirector } from "./DecayDirectorElement";
import { Direction, Wayfinder } from "../utils/MFMWayfinder";

//Tell TypeScript what Quarks this Element will Inherit from
export interface Fly extends QDirectional {}

export class Fly extends Element {
  static BASE_TYPE: IElementType = { name: "FLY", symbol: "Fl", class: Fly, color: 0xff66cc };
  static CREATE = Fly.CREATOR();

  counter = 0;
  max = 4;

  constructor() {
    super(Fly.BASE_TYPE);
    this.setRandomDirection();

    //Register this element with the Classes of the Quark
    //for identification purposes with Atom.isClass(Quark)
    this.registerClass(QDirectional);
  }

  leavePheromones(ew: EventWindow) {
    //don't pheromone on the edges
    if (ew.getAll().filter((s) => s).length < 30) {
      this.reverse();
      return;
    }

    const behindEmpty = ew.getIndexes(ew.getMinus(Wayfinder.DIRECTIONS_BEHIND_MAP.get(this.direction), EventWindow.ADJACENT8WAY), Empty.BASE_TYPE, true);
    const behindEmptyLeft = ew.getIndexes(
      ew.getMinus(Wayfinder.DIRECTIONS_BEHIND_MAP.get(Wayfinder.slightLeft(this.direction)), EventWindow.ADJACENT8WAY),
      Empty.BASE_TYPE,
      true
    );
    const behindEmptyRight = ew.getIndexes(
      ew.getMinus(Wayfinder.DIRECTIONS_BEHIND_MAP.get(Wayfinder.slightRight(this.direction)), EventWindow.ADJACENT8WAY),
      Empty.BASE_TYPE,
      true
    );

    const decayDirectorLifeSpan = 5;
    const allBehindEmpties = [...behindEmpty, ...behindEmptyLeft, ...behindEmptyRight];

    if (allBehindEmpties.length) {
      allBehindEmpties.forEach((b) => {
        ew.mutate(b, DecayDirector.CREATE({ params: [this.direction, decayDirectorLifeSpan, EventWindow.ADJACENT8WAY] }, undefined, 0x444f44));
      });
    }

    // if (behindEmptyLeft.length) {
    //   ew.mutate(behindEmptyLeft[0], DecayDirector.CREATE({ params: [this.direction, decayDirectorLifeSpan, EventWindow.ADJACENT8WAY] }, undefined, 0x444f44));
    // }

    // if (behindEmptyRight.length) {
    //   ew.mutate(behindEmptyRight[0], DecayDirector.CREATE({ params: [this.direction, decayDirectorLifeSpan, EventWindow.ADJACENT8WAY] }, undefined, 0x444f44));
    // }
  }

  behave(ew: EventWindow) {
    const swimTypes: IElementType[] = [Empty.BASE_TYPE, Sand.BASE_TYPE, DecayDirector.BASE_TYPE, Fly.BASE_TYPE];

    //Am I being directed?
    if (this.swapIfDirected(ew, swimTypes)) {
      const nearbyDirectors = ew.getIndexes([...EventWindow.LAYER1, ...EventWindow.LAYER2], DecayDirector.BASE_TYPE);

      this.color = 0x8348c1;

      if (!nearbyDirectors.length) {
        this.isDirected = false;
        this.color = 0xff66cc;
      }
      return;
    } else {
      this.color = 0xff66cc;
    }

    this.leavePheromones(ew);

    this.counter++;

    if (!this.swapDirectionally(ew, swimTypes)) {
      this.turnRandomly();
    }

    if (this.counter % this.max == 0) {
      this.counter = 0;
      this.veerRandomly();
    }
  }

  exec(ew: EventWindow) {
    this.behave(ew);
    super.exec(ew);
  }
}

//Apply Quark properties and methods to the Element
Element.applyMixins(Fly, [QDirectional]);

//Initialize Splat Map maps the # to to the self type
Fly.INITIALIZE_SPLAT_MAP()();
