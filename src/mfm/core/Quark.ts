import { EventWindow } from "./EventWindow";

export abstract class Quark {
  static CLASS: string;
  // static CAPABILITIES: Map<string, Function> = new Map<string, Function>();

  // static registerCapability(name: string, capability: Function) {
  //   this.CAPABILITIES.set(name, capability);
  // }

  // static do(ew: EventWindow, capability?: string) {
  //   if (!capability) {
  //     Array.from(this.CAPABILITIES.values()).forEach((capability) => capability(ew));
  //   } else if (this.CAPABILITIES.has(capability)) {
  //     this.CAPABILITIES.get(capability)(ew);
  //   }
  // }
}
