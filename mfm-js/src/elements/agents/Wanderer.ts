import { Repel } from "../../capabilities/Repel";
import { Wayfinding } from "../../capabilities/Wayfinding";
import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Wayfinder } from "../../mfm/Wayfinder";
import { Empty } from "../core/Empty";
import { Wall } from "../core/Wall";

export class Wanderer extends Element {
  //VARIANTS
  static CREATE = Wanderer.CREATOR({ name: "WANDERER", class: Wanderer, color: 0xbe146f, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] });
  static FLY = Wanderer.CREATOR({ name: "FLY", class: Wanderer, color: 0xccaaff, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] });
  static MOSQUITO = Wanderer.CREATOR({ name: "MOSQUITO", class: Wanderer, color: 0xccff55, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] });
  static BIRD = Wanderer.CREATOR({ name: "BIRD", class: Wanderer, color: 0x4a9bef, classifications: ["DIRECTIONAL", "DIRECTABLE"], groups: ["Life"] });

  static SWAMPDATA = Wanderer.CREATOR({
    name: "SWAMP DATA",
    class: Wanderer,
    color: 0x542300,
    classifications: ["OFSWAMP", "DIRECTIONAL", "DIRECTABLE"],
    groups: ["Swamp"],
  });

  //SYSTEM ELEMENTS
  static BIRD_WING = Wall.CREATOR(
    { name: "BIRD WING", class: Wall, color: 0x3a8bdf, classifications: ["DECAYABLE", "BIRD", "DIRECTABLE", "TAIL"] },
    { lifeSpan: 2 }
  );
  static FLY_TAIL = Wall.CREATOR({ name: "FLY TAIL", class: Wall, color: 0x991144, classifications: ["DECAYABLE", "TAIL"] }, { lifeSpan: 10 });
  static MOSQUITO_TAIL = Wall.CREATOR({ name: "MOSQUITO TAIL", class: Wall, color: 0x557700, classifications: ["DECAYABLE", "TAIL"] }, { lifeSpan: 10 });

  constructor(type: IElementType, state: any = {}) {
    super(type, state);
    this.init();
  }

  init() {
    this.state.colorMap = {
      "N": 0xf77189,
      "NNE": 0xf77732,
      "NE": 0xce9032,
      "ENE": 0xb39b32,
      "E": 0x97a431,
      "ESE": 0x6cad31,
      "SE": 0x32b166,
      "SSE": 0x34af8e,
      "S": 0x36ada4,
      "SSW": 0x37abb8,
      "SW": 0x39a7d0,
      "WSW": 0x5a9ef4,
      "W": 0xa48cf4,
      "WNW": 0xd673f4,
      "NW": 0xf561dd,
      "NNW": 0xf66ab5
    };

    this.state.setColor = () => {
      this.state.color = this.state.colorMap[this.state.heading] ?? 0x557700;
    }

  }

  behave(ew: EventWindow) {
    super.behave(ew);

    if (this.state.heading) {
      // const front = [Wayfinder.getInFront(this.state.heading)[0]];
      // const others = [...Wayfinder.getBehind(this.state.heading), Wayfinder.getLeft(this.state.heading)[0], Wayfinder.getRight(this.state.heading)[0]];

      // if (!ew.is(front[0], "EMPTY")) {
      //   const move = Wayfinder.veerRandom(this.state.heading);
      //   const moveSite = Wayfinder.getDirectionalMove(move, true);

      //   if (ew.is(moveSite, "EMPTY")) {
      //     this.state.heading = move;
      //   } else if (Repel.MAKE_REPELLER(["MOVABLE"], front, [9, 10, 11, 12, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36])(ew, this)) {
      //     return;
      //   }
      // }

      // if (Repel.MAKE_REPELLER(["MOVABLE"], front, others)(ew, this)) {
      //   return;
      // }

      const front = [Wayfinder.getInFront(this.state.heading)[0]];
      if (ew.is(front[0], "MOVABLE")) {
        Repel.MAKE_REPELLER(["MOVABLE"], front, [9, 10, 11, 12, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36])(ew, this)
      }
    }

    if (ew.selfIs("FLY")) {
      this.behaveAsFly(ew);
    } else if (ew.selfIs("MOSQUITO")) {
      this.behaveAsMosquito(ew);
    } else if (ew.selfIs("BIRD")) {
      this.behaveAsBird(ew);
    } else if (ew.selfIs("SWAMP DATA")) {
      this.behaveAsSwampData(ew);
    } else {

      // No heading, set it.
      if (!this.state.heading) {
        Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM());
        return;
      }
      
      //At the edge of the universe, uni-reverse!
      if( !ew.exists(Wayfinder.getInFront(this.state.heading)[0]) ) {
        Wayfinding.REVERSE(this);
        Wayfinding.SLIGHT_RANDOMLY(this);
        return;
      }

      //Be guided by the front
      const frontWanderer = ew.filter(Wayfinder.getInFront(this.state.heading, true), "WANDERER", true)?.[0];
      if( frontWanderer ) {
        this.state.heading = ew.getSite(frontWanderer).atom.state.heading;
      } else if( EventWindow.oneIn(100) ) {
        Wayfinding.SLIGHT_RANDOMLY(this);
      }

      //Lead the back
      const neighborWanderers = ew.filter(Wayfinder.getBehind(this.state.heading, true), "WANDERER", false);
      if (neighborWanderers.length > 0) {
        neighborWanderers.forEach((neighborWanderer) => {
          ew.getSite(neighborWanderer).atom.state.heading = this.state.heading;
        });
      }

      //Move!
      if(!Wayfinding.MOVE_DIRECTIONALLY(ew, this)) {
        Wayfinding.SLIGHT_RANDOMLY(this);
      }

      this.state.setColor();
    }
  }

  behaveAsFly(ew: EventWindow) {
    if (!this.state.heading) {
      Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM());
    } else {
      [
        Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.state.heading), true),
        Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.state.heading), true),
      ].forEach((s) => {
        if (ew.is(s, "EMPTY")) ew.replace(s, Wanderer.FLY_TAIL());
      });

      Wayfinding.MOVE_DIRECTIONALLY(ew, this, "EMPTY", Wanderer.FLY_TAIL());
      if (EventWindow.oneIn(2)) Wayfinding.SLIGHT_RANDOMLY(this);
    }
  }

  behaveAsMosquito(ew: EventWindow) {
    if (!this.state.heading) {
      Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM());
    } else {
      Wayfinding.MOVE_DIRECTIONALLY(ew, this, "EMPTY", Wanderer.MOSQUITO_TAIL());
      Wayfinding.SLIGHT_RANDOMLY(this);
    }

    // this.blazeTrail(ew);
  }

  behaveAsBird(ew: EventWindow) {
    if (!this.state.heading) {
      Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM());
    } else {
      const neighborBird = ew.filter(EventWindow.ALLADJACENT, "BIRD", true)[0];
      if (neighborBird) {
        this.state.heading = ew.getSite(neighborBird).atom.state.heading ?? this.state.heading;
      }

      [
        Wayfinder.getDirectionalMove(Wayfinder.turnRight(this.state.heading), true),
        Wayfinder.getDirectionalMove(Wayfinder.turnLeft(this.state.heading), true),
      ].forEach((s) => {
        if (ew.is(s, "EMPTY")) ew.replace(s, Wanderer.BIRD_WING({}, { heading: this.state.heading }));
      });

      if (!Wayfinding.MOVE_DIRECTIONALLY(ew, this, "EMPTY")) {
        Wayfinding.REVERSE(this);
      } else if (EventWindow.oneIn(4)) {
        Wayfinding.SLIGHT_RANDOMLY(this);
      }
    }
  }

  behaveAsSwampData(ew: EventWindow) {
    if (!this.state.heading) {
      Wayfinding.SET_DIRECTION(this, Wayfinder.RANDOM());
    } else {
      const empty = ew.filter(Wayfinder.getInFront(this.state.heading), "EMPTY");

      if (empty.length) {
        Wayfinding.REVERSE(this);
      }

      if (EventWindow.oneIn(10)) {
        Wayfinding.SWAP_DIRECTIONALLY(ew, this, "SWAMP");
        Wayfinding.SLIGHT_RANDOMLY(this);
      }
    }
  }


  blazeTrail(ew:EventWindow) {
    if( this.state.heading) {
      const left = Wayfinder.getInFront( Wayfinder.turnLeft(this.state.heading) )[1];
      const right = Wayfinder.getInFront( Wayfinder.turnRight(this.state.heading) )[1];

      if( ew.is(left, "EMPTY") ) {
        ew.mutate(left, Wall.MOVABLE_WALL );
      } else if(   ew.is( left, "MOVABLE WALL") ) {
        ew.mutate(left, Empty.CREATE );

      }

      if( ew.is(right, "EMPTY") ) {
        ew.mutate(right, Wall.MOVABLE_WALL );
      }else if(   ew.is( right, "MOVABLE WALL") ) {
        ew.mutate(right, Empty.CREATE );

      }

      // const left = ew.filter( Wayfinder.getInFront( Wayfinder.turnLeft(this.state.heading)), "EMPTY" );
      // const right = ew.filter( Wayfinder.getInFront( Wayfinder.turnRight(this.state.heading)), "EMPTY" );

      // if( left.length ) {
      //   ew.mutateMany(left, Wall.MOVABLE_WALL );
      // }

      // if( right.length ) {
      //   ew.mutateMany(right, Wall.MOVABLE_WALL );
      // }
    }
  }
}
