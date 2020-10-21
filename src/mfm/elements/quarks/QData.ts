import { EventWindow } from "../../core/EventWindow";
import { Quark } from "../../core/Quark";

export class QData extends Quark {
  static CLASS: string = "DATA";

  setData(ew: EventWindow, value: any) {
    if (!ew.origin.atom.data) {
      ew.origin.atom.data = { value: undefined };
    }

    ew.origin.atom.data.value = value;
  }

  getData(ew: EventWindow): any {
    return ew.origin.atom.data?.value;
  }

  hasData(ew: EventWindow): boolean {
    return Boolean(ew.origin.atom.data?.value);
  }
}
