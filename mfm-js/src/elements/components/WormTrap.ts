import { Decay } from "../../capabilities/Decay";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Builder } from "../core/Builder";
import { Wall } from "../core/Wall";

export class WormTrap extends Element {
  static CREATE = WormTrap.CREATOR({ name: "WORMTRAP", class: WormTrap, color: 0x8844ee, groups: ["Structural"] });
  
  static BUILDER = Builder.CREATOR(
    { name: "WORM TRAP WALL", class: Builder, color: 0x121112, groups: ["Misc"] },
    { buildPath: [4], totalSteps: 5, atomizer: Wall.CREATE, transitionAge: 1 }
  );

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {
    this.state.status = "LOOKING";
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    switch( this.state.status ) {
      case "LOOKING":
        this.captureWorm(ew);
      break;
      case "HOLDING":
        ew.mutate(2, WormTrap.BUILDER );
        ew.mutate(3, WormTrap.BUILDER );
        this.state.status = "BUILT";
      break;
      case "BUILT":

        if( ew.is( 1, "SWAPWORM")) {
          const worm = ew.getSite(1).atom;
          worm.state.heading = "E";
          worm.state.status = "DIRECTED";
        }

        if( ew.is( 2, "WORM TRAP WALL") ) {
          return;
        } else if( ew.is( 2, "WALL") ) {
          ew.swap(4);
        } else {
          ew.mutateMany([2,3], Wall.CREATE);
          this.state.status = "DONE";
          return;
        }
      break;
    }

    if (ew.selfIs("DECAYABLE")) {
      Decay.DECAY(ew, this, this.state.lifeSpan ?? 100, 2);
    }
  }

  captureWorm( ew:EventWindow ):Boolean {

    const worms = ew.filter([1,5,6,9], "SWAPWORM" );

    if( worms.length > 0 ) {
      const worm = ew.getSite( EventWindow.RANDOM(worms) ).atom;

      const empties = ew.filter([,2,3,10,11,15,16,13,14,21,25,26,29,30,37], "EMPTY");
      ew.mutateMany( empties, Wall.CREATE );

      worm.state.status = "DIRECTED";
      this.state.status = "HOLDING";

      return true;
    }

    return false;
  }
}
