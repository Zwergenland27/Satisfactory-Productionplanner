const Building = require('./building')
const BuildingInterface = require('./buildingInterface')
const Resource = require('./resource')

module.exports = class BuildingsModel {
    
    static #categories = new Array('logistics', 'manufacturers', 'smelters', 'miners', 'fluid-extractors')

    #logistics
    #manufacturers
    #smelters
    #miners
    #fluidExtractors

    constructor() {
        this.#logistics = new Array()
        this.#manufacturers = new Array()
        this.#smelters = new Array()
        this.#miners = new Array()
        this.#fluidExtractors = new Array()
        this.#loadBuildings()
    }

    #loadBuildings() {
        //this.#logistics.push(new Building("LOGISTIC", 'logistics', 8, 10, [BuildingInterface.INPUT], [BuildingInterface.OUTPUT]))

        this.#manufacturers.push(new Building("Assembler", 'manufacturers', 10, 15, [BuildingInterface.CONVEYOR, BuildingInterface.CONVEYOR], [BuildingInterface.CONVEYOR]))
        this.#smelters.push(new Building("Smelter", 'smelters', 6, 9, [BuildingInterface.CONVEYOR], [BuildingInterface.CONVEYOR]))
        this.#miners.push(new Building("Miner Mk.1", "miners", 6, 14, [], [BuildingInterface.CONVEYOR]))
        //this.#fluidExtractors.push(new Building("FLUID", "fluid-extractors"))
    }

    getCategories() {
        return BuildingsModel.#categories
    }

    getBuildingsOfCategory(category) {
        switch(category){
            case 'logistics': return this.#logistics;
            case 'manufacturers': return this.#manufacturers;
            case 'smelters': return this.#smelters;
            case 'miners': return this.#miners;
            case 'fluid-extractors': return this.#fluidExtractors;
            default: return null;
        }
    }
}