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

    static lastNumericId: number = 0

    private id: string
    private numericId: number
    private name: string
    private category: BuildingCategory
    private width: number
    private length: number
    private interfaces: BuildingInterface[]
    private recipe: Recipe

    /**
     * 
     * @param name The displayed name of the building (for example Miner Mk.1)
     * @param category The category in which the building is listed in the building menu in the game
     * @param id The building unique id
     * @param width The width of the building bounds in meters
     * @param length The length of the building bounds in meters
     * @param interfaces The interfaces that the building has for conveyor belts and pipes
     */
    constructor(name: string, id: string, category: BuildingCategory, width: number, length: number, interfaces: BuildingInterface[]) {
        if(width <= 0)                  throw new Error('Building width must be greater than 0');
        if(length <= 0)                 throw new Error('Building length must be greater than 0');

        name = name.trim();
        if(name.length == 0)            throw new Error("Invalid building name");

        id = id.trim();
        if(id.length == 0)              throw new Error("Invalid building id");

        if(interfaces.length == 0)      throw new Error("Building must have at least one interface");

        this.name = name;
        this.id = id;
        this.category = category
        this.width = width
        this.length = length

        this.interfaces = interfaces;
        this.recipe = null!
        
        this.numericId = Building.lastNumericId
        Building.lastNumericId++

    }

    /**
     * 
     * @returns an array containing all supported categories
     */
    static getCategories(): BuildingCategory[] {
        let categories = new Array();
        for(var category in BuildingCategory) {
            categories.push(category);
        }
        return categories;
    }

    /**
     * @description Copies the base content of this object into a new one, to avoid referencing this object by accident
     * @returns a new building object, containing the same name, category, width, length, interfaces as this object
     */
    clone() : Building {
        let clone = new Building(
            this.name,
            this.id,
            this.category,
            this.width,
            this.length,
            this.interfaces
        );
        return clone;
    }

    /**
     * 
     * @returns the unique id of the building object
     */
    getNumericId(): number {
        return this.numericId
    }

    /**
     * 
     * @returns the name of the building
     */
    getName(): string {
        return this.name
    }

    /**
     * 
     * @returns the width of the building bounds in meters
     */
    getWidth(): number {
        return this.width
    }
    
    /**
     * 
     * @returns the length of the building bounds in meters
     */
    getLength(): number {
        return this.length
    }

    /**
     * 
     * @returns the category in which the building is listed in the building menu in the game
     */
    getCategory(): BuildingCategory {
        return this.category
    }

    /**
     * 
     * @returns the building unique id
     */
    getId(): string {
        return this.id;
    }


    /**
     * 
     * @returns an arary containing the output interfaces of the building
     */
    getOutputs(): BuildingInterface[] {
        let outputs = new Array()
        this.interfaces.forEach(buildingInterface => {
            if(buildingInterface.getDirection() == InterfaceDirection.OUTPUT) outputs.push(buildingInterface)
        })
        return outputs
    }
    
    /**
     * 
     * @returns an array containing the input interfaces of the building
     */
    getInputs(): BuildingInterface[] {
        let inputs = new Array()
        this.interfaces.forEach(buildingInterface => {
            if(buildingInterface.getDirection() == InterfaceDirection.INPUT) inputs.push(buildingInterface)
        })
        return inputs
    }

    /**
     * 
     * @param recipe the recipe that this building should use
     */
    setRecipe(recipe: Recipe): void {
        if(!recipe.isAllowedInBuilding(this.id)) throw new Error("Recipe cannot be used in this building");
        this.recipe = recipe

        recipe.getIngredients().forEach(input => {
            console.log(input)
        })
        recipe.getProducts().forEach(output => {
            console.log(output)
        })
    }

    /**
     * 
     * @returns the recipe that is set for the building
     */
    getRecipe(): Recipe {
        return this.recipe
    }
}