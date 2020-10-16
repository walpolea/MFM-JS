import { EventWindow, EWIndex } from "../../core/EventWindow";
import { Element } from "../../core/Element";
import { IElementType } from "../../core/IElementType";
import { ElementRegistry } from "../../core/ElementRegistry";
import { Empty } from "../EmptyElement";
import { Utils } from "../../utils/MFMUtils";
import { Atom } from "../../core/Atom";
import { Wayfinder, Direction } from "../../utils/MFMWayfinder";
import { DecayWall } from "../DecayWallElement";
import { Player } from "./Player";
import { Wall } from "../WallElement";
import { Actions } from "../../utils/MFMActions";

declare var Howl: any;

export class Enemy extends Element {
  static BASE_TYPE: IElementType = { name: "Enemy", symbol: "En", class: Enemy, color: 0xff224f };
  static CREATE = Enemy.CREATOR();

  isStunned: boolean = false;

  dieBlip = new Howl({
    src: ["/gameFiles/qblip.wav"],
    autoplay: false,
    loop: false,
    volume: 0.1,
  });

  constructor() {
    super(Enemy.BASE_TYPE);
  }

  stun() {
    this.color = 0x22aa44;
    this.isStunned = true;
  }

  unstun() {
    this.color = 0xff224f;
    this.isStunned = false;
  }

  exec(ew: EventWindow) {
    const nearbyDecayWall = ew.getNearestIndex(EventWindow.ADJACENT8WAY, DecayWall.BASE_TYPE);

    if (nearbyDecayWall && Utils.oneIn(2)) {
      this.stun();
    }

    if (this.isStunned) {
      if (Utils.oneIn(60)) {
        this.unstun();
      }
    } else {
      const outerPlayer = ew.getIndexes([...EventWindow.LAYER3, ...EventWindow.LAYER4], Player.BASE_TYPE, true)[0];

      if (outerPlayer && Utils.oneIn(30)) {
        ew.destroy(outerPlayer);
        this.dieBlip.play();

        if (Utils.oneIn(2)) {
          ew.destroy();
        }
      }

      const nearbyPlayer = ew.getNearestIndex(EventWindow.ADJACENT8WAY, Player.BASE_TYPE);

      if (nearbyPlayer && Utils.oneIn(6)) {
        ew.destroy(nearbyPlayer);
        this.dieBlip.play();

        if (Utils.oneIn(3)) {
          ew.destroy();
        }
      }
    }

    Actions.patrol(ew);

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Enemy.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementRegistry.registerType(Enemy.BASE_TYPE);
