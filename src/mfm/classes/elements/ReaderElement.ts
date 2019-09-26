import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes } from "../ElementTypes";
import { Atom } from "../Atom";
import { MFMUtils } from "../../utils/utils";
import { DataElement } from "./DataElement";
import { Site } from "../Site";
import { KeyboardElement } from "./KeyboardElement";

//data exists on the atom, so this thing doesn't do much but be a shell for an instance
export class ReaderElement extends Elem {

  constructor() {
    super(ElementTypes.READER.name, ElementTypes.READER.type);
  }

  exec(ew: EventWindow) {


    //look for keyboard base layer
    if (ew.origin.readBase().is(ElementTypes.KEYBOARD)) {
      const key = (ew.origin.readBase().elem as KeyboardElement).data;


      const emptyAdj = ew.getRandomIndexOfType(EventWindow.ADJACENT8WAY, ElementTypes.EMPTY);

      if (emptyAdj !== undefined && key !== undefined) {

        ew.mutate(emptyAdj, new Atom(ElementTypes.DATA, undefined, { value: key }));

        (ew.origin.readBase().elem as KeyboardElement).data = undefined;
      }

    }


    super.exec(ew);
  }

}

