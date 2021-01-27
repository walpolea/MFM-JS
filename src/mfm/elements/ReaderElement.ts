import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Atom } from "../core/Atom";
import { Data } from "./DataElement";
import { Keyboard } from "./KeyboardElement";
import { Empty } from "./EmptyElement";
import { Char } from "./CharElement";
import { Director } from "./DirectorElement";
import { Site } from "../core/Site";
import { Font } from "../utils/MFMFont";
import { QDirector } from "./quarks/QDirector";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class Reader extends Element {
  static BASE_TYPE: IElementType = { name: "READER", symbol: "Rd", class: Reader, color: 0xeeee22 };
  static CREATE = Reader.CREATOR();

  constructor() {
    super(Reader.BASE_TYPE);
  }

  exec(ew: EventWindow) {
    //look for keyboard base layer

    const nw: Site = ew.getSiteByIndex(5);
    if (nw?.atom.is(Empty.BASE_TYPE)) {
      ew.mutate(5, Director.DIRECTOR_WEST());
    }

    const sw: Site = ew.getSiteByIndex(6);
    if (sw?.atom.is(Empty.BASE_TYPE)) {
      ew.mutate(6, Director.DIRECTOR_WEST());
    }

    if (ew.origin.readBase().is(Keyboard.BASE_TYPE)) {
      const key = (ew.origin.readBase().elem as Keyboard).data;

      const emptyAdj = ew.getRandomIndexOfType(EventWindow.W_LINE, Empty.BASE_TYPE);

      console.log(key);

      if (emptyAdj !== undefined && key !== undefined && Font.ALL_CHARACTERS.includes(key)) {
        //ew.mutate(emptyAdj, Data.CREATE({params: [key]}new Atom(Data.BASE_TYPE, undefined, { value: key }));
        // ew.mutate(emptyAdj, Data.CREATE({ params: [[key]] }));
        ew.mutate(emptyAdj, Char.CREATE({ params: [key] }));

        (ew.origin.readBase().elem as Keyboard).data = undefined;
      } else if (key === "Enter" && ew.getSiteByIndex(39)?.atom.is(Empty.BASE_TYPE)) {
        ew.origin.baseAtom = Empty.CREATE();

        if (nw.atom.isClass(QDirector)) {
          ew.destroy(5);
        }
        if (sw.atom.isClass(QDirector)) {
          ew.destroy(6);
        }

        ew.swap(39);
      }
    } else {
      ew.origin.baseAtom = Keyboard.CREATOR()();
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Reader.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
