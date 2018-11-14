import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";

export class AntiForkBombElement extends Elem {
  birthedIndex: number;
  pDIE: number = 1.2; //~75% chance to die
  pEXPLODE: number = 1.33; //75% chance to explode
  constructor(_birthedIndex: number = undefined) {
    super(ElementTypes.EMPTY.name, ElementTypes.EMPTY.type);

    this.birthedIndex = _birthedIndex;
  }
  exec(ew: EventWindow) {
    let fb: Site = ew.getNearest(ElementTypes.FORK_BOMB);

    //randomly die if no fork bombs around
    if (!fb && Math.random() * this.pDIE < 1) {
      ew.origin.killSelf();
      return;
    }

    //while there are forkbombs present, destroy them!
    while (fb) {
      ew.origin.mutateSite(fb, new Atom(ElementTypes.ANTI_FORK_BOMB));
      fb = ew.getNearest(ElementTypes.FORK_BOMB);
    }

    //RED ALERT! Make new anti fork bombs in all EMPTY directions
    if (!this.birthedIndex) {
      //this is the first
      [...Array(40).keys()].forEach(index => {
        let site = ew.getSiteByIndex(index);
        if (site && site.atom.type === ElementTypes.EMPTY) {
          ew.origin.mutateSite(site, new Atom(ElementTypes.ANTI_FORK_BOMB, [index]));
        }
      });
    } else {
      //this is a child, just continue that way
      [ew.getSiteByIndex(this.birthedIndex)].forEach(site => {
        if (site && site.atom.type === ElementTypes.EMPTY) {
          if (Math.random() * this.pEXPLODE < 1) {
            ew.origin.mutateSite(site, new Atom(ElementTypes.ANTI_FORK_BOMB)); //explode
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
