import { Element, IElementType } from "../../mfm/Element";
import { EventWindow } from "../../mfm/EventWindow";
import { Sand } from "./Sand";

export class Builder extends Element {
  // static CREATE = Builder.CREATOR({ name: "BUILDER", symbol: "BLD", class: Builder, color: 0x121112 });

  constructor(type: IElementType, state: any = {}) {
    super(type, state);

    this.init();
  }

  init() {
    this.classifyAs("BUILDER");

    if( !this.state.transitionAge) {
      this.state.transitionAge = 10;
    }
  }

  behave(ew: EventWindow) {
    super.behave(ew);

    const { buildPath, atomizer, totalSteps, transitionAge, age } = this.state;

    

    const currentStep = this.state.currentStep ?? 0;
    const didSpread = this.state.didSpread ?? false;

    const empties = ew.filterByType(buildPath, "EMPTY");

    if (!didSpread && empties.length) {
      if (totalSteps) {
        if (currentStep < totalSteps) {
          ew.mutateMany(empties, this.TYPE.CREATE, [{}, { currentStep: currentStep + 1 }]);
          this.state.totalSteps--;
        }
      } else {
        ew.mutateMany(empties, this.TYPE.CREATE);
      }
    }

    this.state.didSpread = true;
    if (age > transitionAge) ew.mutate(0, atomizer);
  }
}
