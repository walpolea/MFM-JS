///////////////////////////////////////////////////////
//This Element Serves as a Template to create your own.
///////////////////////////////////////////////////////
import { EventWindow } from "../core/EventWindow";
import { Element } from "../core/Element";
import { IElementType } from "../core/IElementType";
import { ElementRegistry } from "../core/ElementRegistry";
import { Utils } from "../utils/MFMUtils";
import { Actions } from "../utils/MFMActions";
import { SPLAT } from "../utils/SPLAT";
import { Empty } from "./EmptyElement";
import { Symmetries } from "../utils/Symmetries";

export class Template extends Element {
  //////////////
  //STATIC SETUP

  //TYPE_DEF is important! Make something up!
  static BASE_TYPE: IElementType = { name: "TEMPLATE", symbol: "Tmp", class: Template, color: 0xfefefe };
  //CREATE is the default Factory to create an Atom of this Element
  static CREATE = Template.CREATOR();
  //If your Element takes in parameters in the constructor, you can add more Macro Factories here using.CREATOR({params: [params]}, data, color)

  //If you want to use SPLAT notation, you should set up static maps for your queries here
  //Splat strings must be noted symmetrically, use tilde (~) to balance out the notation without caring about those sites
  // # means this element's type, @ means the origin and it has to be in the middle of the diagram
  // Check out ElementRegistry.ts for more SPLAT symbols, or Each Element that might be registering their own.
  static checkTopLeftRight = SPLAT.splatToMap(`
     #
    #@#
     ~
  `);

  static checkBottom = SPLAT.splatToMap(`
              ~
              ~
              @
              #
              #              
  `);

  ////////////////
  //INSTANCE SETUP

  pPATROL: number = 5; //ok to initialize here or constructor

  constructor() {
    super(Template.BASE_TYPE);

    //initialize stuff here, or deal with any props you're passing into the constructor
  }

  exec(ew: EventWindow) {
    //This is where the magic happens

    Actions.patrol(ew, EventWindow.ADJACENT8WAY, this.pPATROL); //patrol (move) in an 8-way direction

    //The EventWindow object has a bunch of helper functions
    //for querying and manipulating Atoms in the Eventwindow

    //Using SPLAT
    const result = ew.query(Template.checkTopLeftRight, 0, Template.SPLAT_MAP, Symmetries.NORMAL);

    if (result) {
      //we have a match!
      //query returns a map of Atom Indexes organized by type
      if (result.get(Template.BASE_TYPE.name)) {
        result.get(Template.BASE_TYPE.name).forEach((templateIndex) => {
          ew.destroy(templateIndex);
        });
      }
    }

    const bottomCheckResult = ew.query(Template.checkBottom, 0, Template.SPLAT_MAP, Symmetries.NORMAL);
    const nearbyEmpty = ew.getRandomIndexOfType(EventWindow.ADJACENT8WAY, Empty.BASE_TYPE);
    if (bottomCheckResult && nearbyEmpty) {
      ew.mutate(nearbyEmpty, Template.CREATE(undefined, undefined, this.color + 0xf6 > 0xffffff ? 0xfefefe : this.color + 0xf6));
    }
  }
}

//Initialize Splat Map maps the # to to the self type
Template.INITIALIZE_SPLAT_MAP()();
//Tells the App/GUI that this element exists
ElementRegistry.registerType(Template.BASE_TYPE);

console.log(Template.BASE_TYPE);

//How can I make this template better? Let me know!
