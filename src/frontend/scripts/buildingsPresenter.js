const BuildingView = require("./buildingView")

module.exports = class BuildingsPresenter {
    #model
    #view

    constructor (buildingsModel) {
        this.#model = buildingsModel
    }

    set view(view) {
        this.#view = view
    }

    getBuildings() {
        let categories = this.#model.getCategories()

        categories.forEach(category => {
            let buildings = this.#model.getBuildingsOfCategory(category)
            this.#view.addCategory(category, buildings)
        });
    }

    addOrGetBuilding(buildingId, id) {
        let building = this.#model.getBuilding(parseInt(id))
        
        if(building != null) return building
        building = new BuildingView(buildingId)
        this.#model.addBuilding(building)
        return building
    }
}