import { Repel } from "../../capabilities/Repel";
import { Element, IElementType } from "../../mfm/Element";
import { EWIndex, EventWindow } from "../../mfm/EventWindow";

export class MeshNet extends Element {
  static CREATE = MeshNet.CREATOR({ name: "MESHNET", symbol: "MNT", class: MeshNet, color: 0xee2211, groups: ["MFM"] });

  static ATTRACT = Repel.MAKE_ATTRACTOR(["MESHNET"], EventWindow.ALLADJACENT);
  // static AVOID = Repel.MAKE_AVOIDER(["MESHNET"], [21, 22, 23, 24, 1, 2, 3, 4], [9, 10, 11, 12, 37, 38, 39, 40]);
  static AVOID = Repel.MAKE_AVOIDER(["MESHNET"], [...EventWindow.LAYER1, ...EventWindow.LAYER2, ...EventWindow.LAYER3], [ ...EventWindow.LAYER4, ...EventWindow.LAYER4, ...EventWindow.LAYER4]);

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {
    this.state.homeostasis = 5;
    this.state.inactivityCounter = 0;
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    if( this.state.hasData || this.state.hadData ) {
      this.state.inactivityCounter = 0;
    } else {
      this.state.inactivityCounter++;
    }

    // const DIRECT_NEIGHBOR_SITES:EWIndex[] = [9, 10, 11, 12];
    // const INDIRECT_NEIGHBOR_SITES:EWIndex[] = [21, 22, 23, 24, 37, 38, 39, 40];
    // const OTHER_SITES:EWIndex[] = [1, 2, 3, 4, 5, 6, 7, 8, 13, 14, 15, 16, 17, 18, 19, 20, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

    const nextToMeshNets = ew.filterByType( [...EventWindow.LAYER1, ...EventWindow.ADJACENT8WAY], "MESHNET");
    const neighborMeshNets = ew.filterByType( EventWindow.ALLADJACENT, "MESHNET");

    if( neighborMeshNets.length > 1 ) {
      this.state.color = 0x00ff00;
    } else {
      this.state.color = 0xee2211;
      if( !MeshNet.ATTRACT(ew, this) ) {
        ew.swap(ew.random(EventWindow.ALLADJACENT) );
      }
      return;
    }


    if( neighborMeshNets.length === 0 ) {
      if( !MeshNet.ATTRACT(ew, this) ) {
        ew.swap(ew.random(EventWindow.ALLADJACENT) );
      }
      return;
    }

    if( nextToMeshNets.length > 0 ) {
      MeshNet.AVOID(ew, this);
      return;
    }

    const neighborData = ew.filterByType( EventWindow.ADJACENT8WAY, "RES");

    if( neighborData.length > 0 ) {
      ew.destroy(neighborData[0]);
      this.state.hasData = true;
      this.state.hadData = true;
      return;
    }

    if( this.state.hasData) {
      this.state.color = 0xFFBB33;

      if( neighborMeshNets.length > 0 ) {

        const randomMesh = ew.getSite(EventWindow.RANDOM(neighborMeshNets)).atom;
        if( !randomMesh.state.hasData ) {
          this.state.hasData = false;
          this.state.hadData = true;
          randomMesh.state.hasData = true;
        }
      }

      return;
    }

    if( this.state.hadData && !this.state.hasData ) {
      this.state.color = 0x000;
    }

    if( this.state.inactivityCounter > 1000 ) {
      this.state.inactivityCounter = 0;
      ew.swap(ew.random(EventWindow.ALLADJACENT) );
    }

  }


}
