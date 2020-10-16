import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Atom } from "../core/Atom";
import { Data } from "./DataElement";
import { Keyboard } from "./KeyboardElement";
import { Empty } from "./EmptyElement";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class Reader extends Element {
  static BASE_TYPE: IElementType = { name: "READER", symbol: "Rd", class: Reader, color: 0xeeee22 };
  static CREATE = Reader.CREATOR();

  constructor() {
    super(Reader.BASE_TYPE);
  }

  exec(ew: EventWindow) {
    //look for keyboard base layer
    if (ew.origin.readBase().is(Keyboard.BASE_TYPE)) {
      const key = (ew.origin.readBase().elem as Keyboard).data;

      const emptyAdj = ew.getRandomIndexOfType(EventWindow.ADJACENT8WAY, Empty.BASE_TYPE);

      if (emptyAdj !== undefined && key !== undefined) {
        //ew.mutate(emptyAdj, Data.CREATE({params: [key]}new Atom(Data.BASE_TYPE, undefined, { value: key }));
        ew.mutate(emptyAdj, Data.CREATE({ params: [[key]] }));

        (ew.origin.readBase().elem as Keyboard).data = undefined;
      }
    }

    super.exec(ew);
  }
}

//Initialize Splat Map maps the # to to the self type
Reader.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementRegistry.registerType(Reader.BASE_TYPE);
