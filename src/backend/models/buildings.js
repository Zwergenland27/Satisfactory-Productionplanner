class Building {
    #name
    constructor(name) {
        this.#name = name
    }

    getName() {
        return this.#name
    }
}

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
        this.#logistics.push(new Building("LOGISTIC"))
        this.#manufacturers.push(new Building("MANUFACTURER"))
        this.#smelters.push(new Building("SMELTER"))
        this.#miners.push(new Building("MINER"))
        this.#fluidExtractors.push(new Building("FLUID"))
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