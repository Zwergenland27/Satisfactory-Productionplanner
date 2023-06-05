import { Resource, ResourceType } from "./resource"

export enum InterfaceDirection {
    INPUT,
    OUTPUT
}

export enum ConnectionType {
    CONVEYOR,
    PIPE
}

export class BuildingInterface {

    private direction: InterfaceDirection;
    private connectionType: ConnectionType;
    private resource: Resource;
    private quantity: number;
    
    constructor(direction: InterfaceDirection, connectionType: ConnectionType) {
        if(direction != InterfaceDirection.INPUT && direction != InterfaceDirection.OUTPUT)         throw new Error("Invalid interface direction");
        this.direction = direction;

        if(connectionType != ConnectionType.CONVEYOR && connectionType != ConnectionType.PIPE)      throw new Error("Invalid connection type");
        this.connectionType = connectionType;

        this.resource = null!;
        this.quantity = null!;
    }

    setResource(resource: Resource, quantity: number): void {
        if(resource.getType() == ResourceType.SOLID && this.connectionType == ConnectionType.PIPE)      throw new Error("Invalid resource type");
        if(resource.getType() == ResourceType.FLUID && this.connectionType == ConnectionType.CONVEYOR)  throw new Error("Invalid resource type");

        if(quantity <= 0)       throw new Error("Quantity must be greater than 0");
        
        this.resource = resource;
        this.quantity = quantity;
    }

    getDirection(): InterfaceDirection {
        return this.direction;
    }

    getConnectionType(): ConnectionType {
        return this.connectionType;
    }

    getResource(): Resource {
        return this.resource;
    }

    getQuantity(): number {
        return this.quantity;
    }
}