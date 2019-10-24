import { EventWindow } from "../EventWindow";
import { Elem } from "../Elem";
import { IElementType } from "../IElementType";
import { ElementTypes } from "../ElementTypes";
import { Site } from "../Site";
import { Atom } from "../Atom";
import { Empty } from "./EmptyElement";
import { ForkBomb } from "./ForkBombElement";

export class AntiForkBomb extends Elem {

  static TYPE_DEF: IElementType = { name: "ANTI FORK BOMB", type: "Af", class: AntiForkBomb, color: 0x7f7f20 };
  static CREATE = AntiForkBomb.CREATOR();

  birthedIndex: number;
  pDIE: number = 1.2; //~75% chance to die
  pEXPLODE: number = 1.33; //75% chance to explode

  constructor(_birthedIndex: number = undefined) {
    super(AntiForkBomb.TYPE_DEF);
    this.birthedIndex = _birthedIndex;
  }
  exec(ew: EventWindow) {
    let fb: Site = ew.getNearest(ForkBomb.TYPE_DEF);

    //randomly die if no fork bombs around
    if (!fb && Math.random() * this.pDIE < 1) {
      ew.origin.killSelf();
      return;
    }

    //while there are forkbombs present, destroy them!

    while (fb) {
      ew.origin.mutateSite(fb, new Atom(AntiForkBomb.TYPE_DEF));
      fb = ew.getNearest(ForkBomb.TYPE_DEF);
    }

    //RED ALERT! Make new anti fork bombs in all EMPTY directions
    if (!this.birthedIndex) {
      //this is the first
      [...Array(40).keys()].forEach(index => {
        let site = ew.getSiteByIndex(index);
        if (site && site.atom.type === Empty.TYPE_DEF) {
          ew.origin.mutateSite(site, new Atom(AntiForkBomb.TYPE_DEF, [index]));
        }
      });
    } else {
      //this is a child, just continue that way
      [ew.getSiteByIndex(this.birthedIndex)].forEach(site => {
        if (site && site.atom.type === Empty.TYPE_DEF) {
          if (Math.random() * this.pEXPLODE < 1) {
            ew.origin.mutateSite(site, new Atom(AntiForkBomb.TYPE_DEF)); //explode
          } else {
            ew.origin.mutateSite(site, new Atom(AntiForkBomb.TYPE_DEF, [this.birthedIndex]));
          }
        }
      });
    }

    ew.origin.killSelf();

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
AntiForkBomb.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementTypes.registerType(AntiForkBomb.TYPE_DEF);