import { EventWindow, EWIndex } from "../../core/EventWindow";
import { Element } from "../../core/Element";
import { IElementType } from "../../core/IElementType";
import { ElementRegistry } from "../../core/ElementRegistry";
import { Empty } from "../EmptyElement";
import { Player } from "./Player";
import { RescuedPlayer } from "./RescuedPlayer";

declare var Howl: any;

export class Goal extends Element {
  static BASE_TYPE: IElementType = { name: "Goal", symbol: "Pl", class: Goal, color: 0x99bb11 };
  static CREATE = Goal.CREATOR();

  rescued: number = 0;

  goalSound = new Howl({
    src: ["/gameFiles/ding.wav"],
    autoplay: false,
    loop: false,
    volume: 0.1,
  });

  constructor() {
    super(Goal.BASE_TYPE);
  }

  exec(ew: EventWindow) {
    const nearbyPlayer = ew.getNearestIndex(EventWindow.ALLADJACENT, Player.BASE_TYPE);

    if (nearbyPlayer) {
      const nearestEmpty = ew.getNearestIndex(EventWindow.ALLADJACENT, Empty.BASE_TYPE);
      const np: Player = ew.getSiteByIndex(nearbyPlayer).atom.elem as Player;
      np.finish();

      if (nearestEmpty) {
        ew.mutate(nearbyPlayer, RescuedPlayer.CREATE());
        ew.swap(nearbyPlayer, nearestEmpty);
        this.rescued++;
        this.goalSound.play();
      }
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Goal.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
