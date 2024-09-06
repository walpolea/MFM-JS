export interface ICapability {
  name: string;
  do: Function;
}

export class CapabilityRegistry {
  static CAPABILITIES: Map<string, ICapability> = new Map<string, ICapability>();

  static registerCapability(cap: ICapability) {
    this.CAPABILITIES.set(cap.name.toUpperCase(), cap);
  }

  static getCapability(cap: string | ICapability): ICapability {
    return typeof cap === "string" ? this.CAPABILITIES.get(cap.toUpperCase()) : this.CAPABILITIES.get(cap.name.toUpperCase());
  }
}
