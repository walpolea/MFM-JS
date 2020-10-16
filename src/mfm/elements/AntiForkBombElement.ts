import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Site } from "../core/Site";
import { Atom } from "../core/Atom";
import { Empty } from "./EmptyElement";
import { ForkBomb } from "./ForkBombElement";

export class AntiForkBomb extends Element {
  static BASE_TYPE: IElementType = { name: "ANTIFORKBOMB", symbol: "Af", class: AntiForkBomb, color: 0x7f7f20 };
  static CREATE = AntiForkBomb.CREATOR();

  birthedIndex: number;
  pDIE: number = 1.2; //~75% chance to die
  pEXPLODE: number = 1.33; //75% chance to explode

  constructor(_birthedIndex: number = undefined) {
    super(AntiForkBomb.BASE_TYPE);
    this.birthedIndex = _birthedIndex;
  }
  exec(ew: EventWindow) {
    let fb: Site = ew.getNearest(ForkBomb.BASE_TYPE);

    //randomly die if no fork bombs around
    if (!fb && Math.random() * this.pDIE < 1) {
      ew.origin.die();
      return;
    }

    //while there are forkbombs present, destroy them!

    while (fb) {
      ew.origin.mutateSite(fb, new Atom(AntiForkBomb.BASE_TYPE));
      fb = ew.getNearest(ForkBomb.BASE_TYPE);
    }

    //RED ALERT! Make new anti fork bombs in all EMPTY directions
    if (!this.birthedIndex) {
      //this is the first
      [...Array(40).keys()].forEach((index) => {
        let site = ew.getSiteByIndex(index);
        if (site?.atom.is(Empty.BASE_TYPE)) {
          ew.origin.mutateSite(site, new Atom(AntiForkBomb.BASE_TYPE, [index]));
        }
      });
    } else {
      //this is a child, just continue that way
      [ew.getSiteByIndex(this.birthedIndex)].forEach((site) => {
        if (site?.atom.is(Empty.BASE_TYPE)) {
          if (Math.random() * this.pEXPLODE < 1) {
            ew.origin.mutateSite(site, new Atom(AntiForkBomb.BASE_TYPE)); //explode
          } else {
            ew.origin.mutateSite(site, new Atom(AntiForkBomb.BASE_TYPE, [this.birthedIndex]));
          }
        }
      });
    }

    ew.origin.die();

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
AntiForkBomb.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
