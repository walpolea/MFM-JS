export interface ICapability {
    name: string;
    do: Function;
}
export declare class CapabilityRegistry {
    static CAPABILITIES: Map<string, ICapability>;
    static registerCapability(cap: ICapability): void;
    static getCapability(cap: string | ICapability): ICapability;
}
