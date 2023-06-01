import { BuildingInterface } from "./buildingInterface"
import { Recipe } from "./recipe"

export class Building {

    static LOGISTICS:string = 'LOGISTICS'
    static MANUFACTURERS:string = 'MANUFACTURERS'
    static SMELTERS:string = 'SMELTERS'
    static MINERS:string = 'MINERS'
    static FLUID_EXTRACTORS:string = 'FLUID_EXTRACTORS'

    static #lastId: number = 0

    private id: number
    private name: string
    private category: string
    private width: number
    private length: number
    private interfaces: BuildingInterface[]
    private recipe: Recipe

    constructor(name: string, category: string, width: number, length: number, inputs: string[], outputs: string[]) {
        if(width <= 0)                  throw new Error('Building width must be greater than 0')
        if(length <= 0)                 throw new Error('Building length must be greater than 0')

        this.name = name
        this.category = category
        this.width = width
        this.length = length

        this.interfaces = new Array()
        if(inputs.length > 0) this.addInputs(inputs)
        if(outputs.length > 0) this.addOutputs(outputs)
        this.recipe = null!
        
        this.id = Building.#lastId
        Building.#lastId++

    }

    static createBuilding(id: string): Building {
        let idParts = id.split('.')
        switch(idParts[0].toUpperCase()) {
            case Building.LOGISTICS: return Building.createLogisticBuilding(idParts[1])
            case Building.MANUFACTURERS: return Building.createManufacturerBuilding(idParts[1])
            case Building.SMELTERS: return Building.createSmelterBuilding(idParts[1])
            case Building.MINERS: return Building.createMinerBuilding(idParts[1])
            case Building.FLUID_EXTRACTORS: return Building.createFluidExtractorBuilding(idParts[1])
            default: return null!
        }

    }

    static getCategories(): string[] {
        return new Array(Building.LOGISTICS, Building.MANUFACTURERS, Building.SMELTERS, Building.MINERS, Building.FLUID_EXTRACTORS)
    }

    private static createLogisticBuilding(name: string): Building {
        return null!
    }

    private static createManufacturerBuilding(name: string): Building {
        return new Building(name, Building.MANUFACTURERS, 10, 15, [BuildingInterface.CONVEYOR, BuildingInterface.CONVEYOR], [BuildingInterface.CONVEYOR])
    }

    private static createSmelterBuilding(name: string): Building {
        return new Building(name, Building.SMELTERS, 6, 9, [BuildingInterface.CONVEYOR], [BuildingInterface.CONVEYOR])
    }

    private static createMinerBuilding(name: string): Building {
        return new Building(name, Building.MINERS, 6, 14, [], [BuildingInterface.CONVEYOR])
    }

    private static createFluidExtractorBuilding(name: string): Building {
        return null!
    }

    private addInputs(inputs: string[]): void {
        inputs.forEach(input => {
            let buildingInterface = new BuildingInterface(
                BuildingInterface.INPUT,
                input
            )
            this.interfaces.push(buildingInterface) 
        });
    }

    private addOutputs(outputs: string[]): void {
        outputs.forEach(output => {
            let buildingInterface = new BuildingInterface(
                BuildingInterface.OUTPUT,
                output
            )
            this.interfaces.push(buildingInterface) 
        });
    }

    getNumericId(): number {
        return this.id
    }

    getName(): string {
        return this.name
    }

    getWidth(): number {
        return this.width
    }
    
    getLength(): number {
        return this.length
    }

    getCategory(): string {
        return this.category
    }

    getId(): string {
        return `${this.category}.${this.name}`.toLowerCase()
    }


    getOutputs(): BuildingInterface[] {
        let outputs = new Array()
        this.interfaces.forEach(buildingInterface => {
            if(buildingInterface.getDirection() == BuildingInterface.OUTPUT) outputs.push(buildingInterface)
        })
        return outputs
    }
    
    getInputs(): BuildingInterface[] {
        let inputs = new Array()
        this.interfaces.forEach(buildingInterface => {
            if(buildingInterface.getDirection() == BuildingInterface.INPUT) inputs.push(buildingInterface)
        })
        return inputs
    }

    setRecipe(recipe: Recipe): void {
        this.recipe = recipe

        recipe.getIngredients().forEach(input => {
            console.log(input)
        })
        recipe.getProducts().forEach(output => {
            console.log(output)
        })
    }

    getRecipe(): Recipe {
        return this.recipe
    }
}