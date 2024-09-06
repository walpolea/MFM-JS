import { Element, Empty, EventWindow, Decay } from "mfm-js";
import { useGameState } from "../useGameState";

export class Exit extends Element {
  static CREATE = Exit.CREATOR({ name: "EXIT", class: Exit, color: 0x444444, classifications: ["GOAL"], groups: ["LEMMINGS"] });
  static EMPTY_GOAL = Exit.CREATOR({name: "EMPTY_EXIT", class: Exit, color: 0x444444, classifications: ["GOAL", "EMPTY", "DECORATION"]});
  static EXIT_FRAME = Exit.CREATOR({name: "EXIT_FRAME", class: Exit, color: 0xffc72e, classifications: ["GOAL", "EMPTY", "DECORATION"]});

  static BUILD_MAP = {
    '2': Exit.EMPTY_GOAL,
    '1': Exit.EMPTY_GOAL,
    '4': Exit.EMPTY_GOAL,
    '6': Exit.EMPTY_GOAL,
    '3': Exit.EMPTY_GOAL,
    '8': Exit.EMPTY_GOAL,
    '5': Exit.EXIT_FRAME,
    '7': Exit.EXIT_FRAME,
    '9': Exit.EXIT_FRAME,
    '10': Exit.EXIT_FRAME,
    '12': Exit.EXIT_FRAME,
    '14': Exit.EXIT_FRAME,
    '20': Exit.EXIT_FRAME,
  }
  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {
    this.state.exitCount = 0;
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    if (ew.selfIs("DECORATION")) {
      return;
    }

    this.build(ew);

    const lemmings = ew.filter( EventWindow.ALLADJACENT, 'LEMM');

    if( lemmings.length ) {
      lemmings.forEach( l => ew.destroy(l) );
      this.state.exitCount += lemmings.length;
      useGameState().currentSavedLemmings.value += lemmings.length;
    }
    
  }

  build( ew ) {
    const buildSites = Object.keys(Exit.BUILD_MAP).map( key => parseInt(key) );

    buildSites.forEach( (siteIndex) => {
      if( ew.is( siteIndex, "GOAL") ) {
        return;
      }

      if( ew.is( siteIndex, "EMPTY") ) {
        ew.mutate( siteIndex, Exit.BUILD_MAP[siteIndex] );
      }
      
    });
  }
}
