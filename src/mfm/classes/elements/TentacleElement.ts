import { EventWindow } from "../Eventwindow";
import { Elem } from "../Elem";
import { ElementTypes, IElementType } from "../ElementTypes";
import { Site } from "../Site";
import { EmptyElement } from "./EmptyElement";
import { Atom } from "../Atom";
import { LinkedListElement } from "./LinkedListElement";

export class TentacleElement extends LinkedListElement {

  WORMSIZE: number;
  birthCount: number;
  isConnected: boolean = false;

  constructor(size: number = 4, prev: number = undefined, next: number = undefined) {

    super(ElementTypes.TENTACLE, prev, next);
    this.birthCount = this.WORMSIZE = size;

  }

  connectToTail(ew: EventWindow) {

    let choices: number[] = EventWindow.ADJACENT4WAY;
    let relativeSiteToGo: number = choices[Math.random() * choices.length >> 0];
    let possibleTail: Site = this.getSiteDirection(ew, relativeSiteToGo);

    if (possibleTail && possibleTail.atom.type === ElementTypes.TENTACLE) {
      const pt: LinkedListElement = (possibleTail.atom.elem as LinkedListElement);

      if (pt && pt.isAtTail()) {
        console.log("CONNECTED!!");
        this.prev = relativeSiteToGo;
        pt.next = this.oppositeDirection(relativeSiteToGo);
        this.isConnected = true;
      }
    }

  }


  exec(ew: EventWindow) {

    //Be Born!
    if (this.birthCount > 0) {

      //move
      let choices: number[] = EventWindow.ADJACENT4WAY;
      let relativeSiteToGo: number = choices[Math.random() * choices.length >> 0];
      let goSite: Site = this.getSiteDirection(ew, relativeSiteToGo);

      if (goSite && goSite.atom.type === ElementTypes.EMPTY) {

        this.birthCount--;

        //leave a node
        const leavingAtom: Atom = new Atom(ElementTypes.TENTACLE, [0, relativeSiteToGo, this.next]);
        ew.origin.moveAtom(goSite, leavingAtom);
        this.next = this.oppositeDirection(relativeSiteToGo);

      }



    } else {


      if (this.isConnected) {

        //console.log("is connected");
        const n: TentacleElement = (this.getNextElement(ew) as TentacleElement);
        if (n) {
          n.isConnected = true;
        }

        if (this.isSwapping) {
          //this.unlink(ew);
        } else {



          let choices: number[] = EventWindow.ADJACENT8WAY;
          let relativeSiteToGo: number = choices[Math.random() * choices.length >> 0];
          this.moveTo(ew, relativeSiteToGo);



        }
      } else if (this.isAtHead()) {

        let choices: number[] = EventWindow.ADJACENT4WAY;
        let relativeSiteToGo: number = choices[Math.random() * choices.length >> 0];
        let goSite: Site = this.getSiteDirection(ew, relativeSiteToGo);

        if (goSite && goSite.atom.type === ElementTypes.EMPTY && this.getNextElement(ew) && this.getNextElement(ew).linkType !== "SWAPPER") {
          //leave a swapper
          const leavingAtom: Atom = new Atom(ElementTypes.TENTACLE, [0, relativeSiteToGo, this.next]);
          ew.origin.moveAtom(goSite, leavingAtom);
          this.next = this.oppositeDirection(relativeSiteToGo);
          (leavingAtom.elem as TentacleElement).isSwapping = true;

        }

        this.connectToTail(ew);

      } else {

      }


    }

    super.exec(ew);
  }
}
