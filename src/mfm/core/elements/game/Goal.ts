import { EventWindow, EWIndex } from "../../EventWindow";
import { Elem } from "../../Elem";
import { IElementType } from "../../IElementType";
import { ElementTypes } from "../../ElementTypes";
import { Empty } from "../EmptyElement";
import { Player } from "./Player";
import { RescuedPlayer } from "./RescuedPlayer";

declare var Howl: any;

export class Goal extends Elem {
  static TYPE_DEF: IElementType = { name: "Goal", type: "Pl", class: Goal, color: 0x99bb11 };
  static CREATE = Goal.CREATOR();

  rescued: number = 0;

  goalSound = new Howl({
    src: ["/gameFiles/ding.wav"],
    autoplay: false,
    loop: false,
    volume: 0.1,
  });

  constructor() {
    super(Goal.TYPE_DEF);
  }

  exec(ew: EventWindow) {
    const nearbyPlayer = ew.getNearestIndex(EventWindow.ALLADJACENT, Player.TYPE_DEF);

    if (nearbyPlayer) {
      const nearestEmpty = ew.getNearestIndex(EventWindow.ALLADJACENT, Empty.TYPE_DEF);
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
ElementTypes.registerType(Goal.TYPE_DEF);
