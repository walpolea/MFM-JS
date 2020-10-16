import { EventWindow, EWIndex } from "../../core/EventWindow";
import { Element } from "../../core/Element";
import { IElementType } from "../../core/IElementType";
import { ElementRegistry } from "../../core/ElementRegistry";
import { Empty } from "../EmptyElement";
import { Utils } from "../../utils/MFMUtils";
import { Atom } from "../../core/Atom";
import { Wayfinder, Direction } from "../../utils/MFMWayfinder";
import { DecayWall } from "../DecayWallElement";
import { Enemy } from "./Enemy";
import { Dirt } from "./Dirt";

declare var Howl: any;

export class Player extends Element {
  static BASE_TYPE: IElementType = { name: "Player", symbol: "Pl", class: Player, color: 0xffff44 };
  static CREATE = Player.CREATOR();

  turnBlip = new Howl({
    src: ["/gameFiles/turnblip.wav"],
    autoplay: false,
    loop: false,
    volume: 0.05,
  });

  direction: Direction;
  counter = 0;
  max = 20;
  done = false;
  constructor() {
    super(Player.BASE_TYPE);
    this.direction = Wayfinder.DIRECTIONS[(Wayfinder.DIRECTIONS.length * Math.random()) >> 0];
  }

  reverse() {
    this.direction = Wayfinder.reverse(this.direction);
  }

  slightLeft() {
    this.direction = Wayfinder.slightLeft(this.direction);
    this.turnBlip.volume(0.1);
    this.turnBlip.play();
  }

  slightRight() {
    this.direction = Wayfinder.slightRight(this.direction);
    this.turnBlip.volume(0.1);
    this.turnBlip.play();
  }

  makeTrail(): Atom {
    return DecayWall.CREATE({ params: [5] }, undefined, [0x448888, 0x227777, 0x669999, 0x00bbbb][(Math.random() * 4) >> 0]);
  }

  finish() {
    this.done = true;
  }

  exec(ew: EventWindow) {
    if (!this.done) {
      this.counter++;
      const travelTo: EWIndex = Wayfinder.getDirectionalMove(this.direction, true);

      if (ew.is(travelTo, Dirt.BASE_TYPE)) {
        ew.destroy(travelTo);
      }

      const leftSite = Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.direction), true);
      const rightSite = Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.direction), true);

      if (ew.is(travelTo, Empty.BASE_TYPE)) {
        if (ew.is(leftSite, Empty.BASE_TYPE)) ew.mutate(leftSite, this.makeTrail());
        if (ew.is(rightSite, Empty.BASE_TYPE)) ew.mutate(rightSite, this.makeTrail());

        ew.move(travelTo, this.makeTrail());
      }

      const nearbyPlayer = ew.getNearestIndex(EventWindow.ALLADJACENT, Player.BASE_TYPE);

      if (nearbyPlayer) {
        const np: Player = ew.getSiteByIndex(nearbyPlayer).atom.elem as Player;
        np.direction = this.direction;
      }

      const nearbyEnemy = ew.getNearestIndex([...EventWindow.LAYER1, ...EventWindow.LAYER2], Enemy.BASE_TYPE);

      if (nearbyEnemy) {
        if (Utils.oneIn(4)) {
          (ew.getSiteByIndex(nearbyEnemy).atom.elem as Enemy).stun();
        } else if (Utils.oneIn(30)) {
          ew.destroy(nearbyEnemy);
        }
      }
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Player.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
