import { setFlagsFromString } from "v8";
import { Wayfinding } from "../../capabilities/Wayfinding";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Wayfinder } from "../../mfm/Wayfinder";

export class DirectionalDirector extends Element {
  static CREATE = DirectionalDirector.CREATOR({ name: "DIRDIR", symbol: "DDIR", class: DirectionalDirector, color: 0xaaaaaa, groups: ["Agents"], classifications: ["DIRECTOR"], });


  static DDIR_ONCE = DirectionalDirector.CREATOR(
    { name: "DIRDIR ONCE", symbol: "DDIRO", class: DirectionalDirector, color: 0x999999, classifications: ["DIRECTOR"], groups: ["Agents"] },
    { directableTypes: ["DIRECTABLE"], once: true }
  );

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {}

  behave(ew: EventWindow) {
    super.behave(ew);

    if (!this.state.heading) {
      this.state.heading = Wayfinder.RANDOM( Wayfinder.DIRECTIONS );
      return;
    }

    // Look for directables and direct one
    const directables = ew.filterByType(EventWindow.ALLADJACENT, this.state?.directableTypes ?? ["DIRECTABLE"]);
    if( directables.length > 0) {
      const directable = directables[0];
      const directed = Wayfinding.DIRECT(ew, directable, this.state?.pointing ?? Wayfinder.reverse(this.state.heading) );

      //Die if once and directed
      if( this.state.once && directed ) {
        ew.destroy(0);
        return;
      }

      // this.state.heading = Wayfinder.reverse(this.state.heading);
    }

    // Move in the direction of the heading
    if( this.state.heading ) {
      const moved = Wayfinding.MOVE_DIRECTIONALLY( ew, this, this.state.direction );

      if(!moved) {
        this.state.heading = Wayfinder.slightRandom( this.state.heading );
      }
    }
    
  }

  
}
