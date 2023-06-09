import { BuildingInterface, InterfaceConnectionType, InterfaceDirection } from "./buildingInterface";
import { Recipe } from "./recipe";

export enum BuildingCategory {
    LOGISTICS = "LOGISTICS",
    MANUFACTURERS = 'MANUFACTURERS',
    SMELTERS = 'SMELTERS',
    MINERS = 'MINERS',
    FLUID_EXTRACTORS = 'FLUID_EXTRACTORS'
}

export class Building {

    static lastId: number = 0

    private id: number
    private name: string
    private category: BuildingCategory
    private width: number
    private length: number
    private interfaces: BuildingInterface[]
    private recipe: Recipe

    constructor(name: string, category: BuildingCategory, width: number, length: number, interfaces: BuildingInterface[]) {
        if(width <= 0)                  throw new Error('Building width must be greater than 0')
        if(length <= 0)                 throw new Error('Building length must be greater than 0')

        this.name = name
        this.category = category
        this.width = width
        this.length = length

        this.interfaces = interfaces;
        this.recipe = null!
        
        this.id = Building.lastId
        Building.lastId++

    }

    static getCategories(): BuildingCategory[] {
        let categories = new Array();
        for(var category in BuildingCategory) {
            categories.push(category);
        }
        return categories;
    }

    clone() : Building {
        let clone = new Building(
            this.name,
            this.category,
            this.width,
            this.length,
            this.interfaces
        );
        return clone;
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

    getCategory(): BuildingCategory {
        return this.category
    }

    getId(): string {
        return `${this.category}.${this.name}`.toLowerCase()
    }


    getOutputs(): BuildingInterface[] {
        let outputs = new Array()
        this.interfaces.forEach(buildingInterface => {
            if(buildingInterface.getDirection() == InterfaceDirection.OUTPUT) outputs.push(buildingInterface)
        })
        return outputs
    }
    
    getInputs(): BuildingInterface[] {
        let inputs = new Array()
        this.interfaces.forEach(buildingInterface => {
            if(buildingInterface.getDirection() == InterfaceDirection.INPUT) inputs.push(buildingInterface)
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