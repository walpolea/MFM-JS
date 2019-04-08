import { EventWindow } from "../Eventwindow";
import { SpacialElement } from "./SpacialElement";
import { ElementTypes } from "../ElementTypes";
import { GridCoord } from "../../interfaces/IGridCoord";
import { Site } from "../Site";
import { Atom } from "../Atom";

export class UberElement extends SpacialElement {
  homeBase: GridCoord;
  goHome: boolean = false;
  destination: GridCoord;
  passengerValidator: Function;
  passenger: any;
  pGoHome: number = 100;

  constructor(_destination: GridCoord = undefined, _homeBase: GridCoord = undefined, _validator?: Function) {
    super(ElementTypes.UBER.name, ElementTypes.UBER.type);

    if (!_validator) {
      this.passengerValidator = this.defaultValidator;
    }
    this.homeBase = _homeBase ? _homeBase : { col: 0, row: 0 };
    this.destination = _destination ? _destination : { col: 20, row: 20 };
  }

  exec(ew: EventWindow) {
    ew.getAdjacent4Way(ElementTypes.DATA);

    //look for a passenger
    if (!this.passenger) {
      let potentialPassenger: Site = ew.getAdjacent8Way();

      if (potentialPassenger && this.passengerValidator(potentialPassenger)) {
        this.loadPassenger(potentialPassenger);
      } else {
        //go home
        if (this.goHome && this.homeBase) {
          let homeDir: GridCoord = ew.origin.coordToward(this.homeBase);

          //we're here!
          if (homeDir) {
            this.moveToward(homeDir, ew);
          } else {
            this.goHome = false;
          }
        } else {
          //patrol for passenger
          ew.origin.swapAtoms(ew.getAdjacent4Way(ElementTypes.EMPTY));

          //small chance to chack back in with home
          if (Math.random() * this.pGoHome < 1) {
            this.goHome = true;
          }
        }
      }
    } else {
      //take passenger to destination
      let direction: GridCoord = ew.origin.coordToward(this.destination);

      //we're here!
      if (!direction) {
        this.unloadPassenger(ew);
      } else {
        //keep going!
        this.moveToward(direction, ew);
      }
    }
    super.exec(ew);
  }

  moveToward(direction: GridCoord, ew: EventWindow) {
    let optimalMove: Site = ew.getDirection(direction);

    if (optimalMove && (optimalMove.atom.type === ElementTypes.EMPTY || optimalMove.atom.type === ElementTypes.RES)) {
      console.log("optimal");
      ew.origin.moveAtom(optimalMove);
    } else {
      //optimal is taken, go another way?
      let random8way: Site = ew.getAdjacent8Way();
      if (random8way && (random8way.atom.type === ElementTypes.EMPTY || random8way.atom.type === ElementTypes.RES)) {
        ew.origin.moveAtom(random8way);
      }
    }
  }

  //default validator says a potential passenger is any atom with data
  defaultValidator(site: Site): boolean {
    //console.log(site);
    if (site.atom && site.atom.type === ElementTypes.DATA) {
      return true;
    } else {
      return false;
    }
  }

  loadPassenger(site: Site) {
    console.log("where to buddy?", site);
    this.passenger = {};
    //this.passenger.atom = site.atom;
    this.passenger.type = site.atom.type;
    this.passenger.data = site.atom.data;

    site.killSelf();
  }

  unloadPassenger(ew: EventWindow) {
    console.log("unloading", this.passenger);
    ew.origin.moveAtom(
      ew.getAdjacent8Way(ElementTypes.EMPTY),
      new Atom(this.passenger["type"], undefined, this.passenger["data"])
    );

    //it's a one way trip
    //ew.origin.killSelf(new Atom(this.passenger["type"], undefined, this.passenger["data"]));
    this.passenger = undefined;
    if (this.homeBase) {
      this.goHome = true;
    }
  }
}
