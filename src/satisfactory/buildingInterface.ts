import { Item, ItemType } from "./item"

export enum InterfaceDirection {
    INPUT = "INPUT",
    OUTPUT = "OUTPUT"
}

export enum InterfaceConnectionType {
    CONVEYOR = "CONVEYOR",
    PIPE = "PIPE"
}

export class BuildingInterface {

    private direction: InterfaceDirection;
    private connectionType: InterfaceConnectionType;
    private item: Item;
    private storageAmount: number;
    
    /**
     * 
     * @param direction Set whether the interface is an input or output
     * @param connectionType Set whether the interface should be connected to a conveyo belt or a pipe.
     */
    constructor(direction: InterfaceDirection, connectionType: InterfaceConnectionType) {
        this.direction = direction;
        this.connectionType = connectionType;
        this.item = null!;
        this.storageAmount = null!;
    }

    /**
     * @description Set the item that the interface will be consuming / producing and the local storage for it
     * @param item The item that this interface will accept
     * @param storageAmount Maximum amount of items that the building can store locally before overflowing
     */
    setItem(item: Item, storageAmount: number): void {

        if(storageAmount <= 0)       throw new Error("amount must be greater than 0");
        this.item = item;
        this.storageAmount = storageAmount;
    }

    /**
     * 
     * @returns whether the interface is an input or output
     */
    getDirection(): InterfaceDirection {
        return this.direction;
    }

    /**
     * 
     * @returns whether the interface is for a conveyor belt or a pipe
     */
    getConnectionType(): InterfaceConnectionType {
        return this.connectionType;
    }

    /**
     * 
     * @returns the item that this interface will accept
     */
    getResource(): Item {
        return this.item;
    }

    /**
     * 
     * @returns the max amount of items that the building can store locally before overflowing
     */
    getStorageAmount(): number {
        return this.storageAmount;
    }
}