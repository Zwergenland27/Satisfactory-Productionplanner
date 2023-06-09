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
    private resource: Item;
    private quantity: number;
    
    constructor(direction: InterfaceDirection, connectionType: InterfaceConnectionType) {
        if(direction != InterfaceDirection.INPUT && direction != InterfaceDirection.OUTPUT)         throw new Error("Invalid interface direction");
        this.direction = direction;

        if(connectionType != InterfaceConnectionType.CONVEYOR && connectionType != InterfaceConnectionType.PIPE)      throw new Error("Invalid connection type");
        this.connectionType = connectionType;

        this.resource = null!;
        this.quantity = null!;
    }

    setResource(resource: Item, quantity: number): void {
        if(resource.getType() == ItemType.SOLID && this.connectionType == InterfaceConnectionType.PIPE)      throw new Error("Invalid resource type");
        if(resource.getType() == ItemType.FLUID && this.connectionType == InterfaceConnectionType.CONVEYOR)  throw new Error("Invalid resource type");

        if(quantity <= 0)       throw new Error("Quantity must be greater than 0");
        
        this.resource = resource;
        this.quantity = quantity;
    }

    getDirection(): InterfaceDirection {
        return this.direction;
    }

    getConnectionType(): InterfaceConnectionType {
        return this.connectionType;
    }

    getResource(): Item {
        return this.resource;
    }

    getQuantity(): number {
        return this.quantity;
    }
}