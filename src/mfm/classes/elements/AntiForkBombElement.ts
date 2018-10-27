import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";

export class AntiForkBombElement extends Elem {
  birthedIndex: number;
  constructor(_birthedIndex: number = undefined) {
    super(ElementTypes.EMPTY.name, ElementTypes.EMPTY.type);

    this.birthedIndex = _birthedIndex;
  }
  exec(ew: EventWindow) {
    let fb: Site = ew.getNearest(ElementTypes.FORK_BOMB);

    if (!fb && Math.random() < 0.1) {
      ew.origin.killSelf();
      return;
    }

    //while there are forkbombs present, destroy them
    while (fb) {
      ew.origin.mutateSite(fb, new Atom(ElementTypes.EMPTY));
      fb = ew.getNearest(ElementTypes.FORK_BOMB);
    }

    //make new anti fork bombs

    if (!this.birthedIndex) {
      //this is the first
      [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40].forEach(index => {
        let site = ew.getSiteByIndex(index);
        if (site) {
          ew.origin.mutateSite(site, new Atom(ElementTypes.ANTI_FORK_BOMB, [index]));
        }
      });
    } else {
      //this is a child, just continue that way
      [ew.getSiteByIndex(this.birthedIndex)].forEach(site => {
        if (site) {
          if (Math.random() < 0.02) {
            ew.origin.mutateSite(site, new Atom(ElementTypes.ANTI_FORK_BOMB));
          } else {
            ew.origin.mutateSite(site, new Atom(ElementTypes.ANTI_FORK_BOMB, [this.birthedIndex]));
          }
        }
      });
    }

    ew.origin.killSelf();
    super.exec(ew);
  }
}
