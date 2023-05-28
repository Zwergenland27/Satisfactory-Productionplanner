const Building = require('./building')

module.exports = class BuildingsModel {

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

        this.#manufacturers.push(Building.createBuilding(`${Building.MANUFACTURERS}.manufacturer`))
        this.#smelters.push(Building.createBuilding(`${Building.SMELTERS}.smelter`))
        this.#miners.push(Building.createBuilding(`${Building.MINERS}.miner`))
        //this.#fluidExtractors.push(new Building("FLUID", "fluid-extractors"))
    }

    getCategories() {
        return Building.getCategories()
    }

    getBuildingsOfCategory(category) {
        switch(category){
            case Building.LOGISTICS: return this.#logistics;
            case Building.MANUFACTURERS: return this.#manufacturers;
            case Building.SMELTERS: return this.#smelters;
            case Building.MINERS: return this.#miners;
            case Building.FLUID_EXTRACTORS: return this.#fluidExtractors;
            default: return null;
        }
    }
}