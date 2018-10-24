import { MFMUtils } from "../utils/utils";
import { GridCoord } from "../interfaces/IGridCoord";
import { Elem } from "./Elem";
import { Site } from "./Site";
import { EmptyEl } from "./elements/EmptyElement";
import { EventWindow } from "./Eventwindow";

export class Atom {
  site: Site;
  id: string;
  sitePos: GridCoord;
  elem: Elem;

  constructor(_site: Site, _pos: GridCoord) {
    this.site = _site;
    this.sitePos = _pos;
    this.id = MFMUtils.CtoID(this.sitePos);

    this.elem = new EmptyEl();
  }

  exec(ew: EventWindow) {
    this.elem.exec(ew);
  }
}
