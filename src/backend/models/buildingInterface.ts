import { Resource } from "./resource"

export class BuildingInterface {

    static INPUT:string = 'INPUT'
    static OUTPUT:string = 'OUTPUT'

    static CONVEYOR:string = 'SOLID'
    static PIPE:string = 'FLUID'

    private direction: string 
    private connectionType: string
    private resource: Resource
    private quantity: number
    
    constructor(direction: string, connectionType: string) {
        if(direction != BuildingInterface.INPUT && direction != BuildingInterface.OUTPUT)             throw new Error('Invalid interface direction')
        this.direction = direction
        if(connectionType != BuildingInterface.CONVEYOR && connectionType != BuildingInterface.PIPE) throw new Error('Invalid connection type')
        this.connectionType = connectionType

        this.resource = null!
        this.quantity = null!
    }

    setResource(resource: Resource, quantity: number): void {
        if(resource.getType() != this.connectionType)   throw new Error('Invalid resource type')
        if(quantity <= 0)                           throw new Error('Quantity must be greater than 0')
        
        this.resource = resource
        this.quantity = quantity
    }

    getDirection(): string {
        return this.direction
    }

    getConnectionType(): string {
        return this.connectionType
    }

    getResource(): Resource {
        return this.resource
    }

    getQuantity(): number {
        return this.quantity
    }
}