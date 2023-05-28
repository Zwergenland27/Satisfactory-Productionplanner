const BuildingView = require("./buildingView")

module.exports = class BuildingsPresenter {
    #model
    #view

    #buildingViews

    constructor (buildingsModel) {
        this.#model = buildingsModel
        this.#buildingViews = new Array()
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

    //Temporär:
    getBuildingView(id) {
        let returnBuildingView = null
        this.#buildingViews.forEach(buildingView => {
            if(buildingView.building.id == id) returnBuildingView = buildingView
        })
        return returnBuildingView
    }

    //Temporär:
    addBuildingView(buildingView) {
        this.#buildingViews.push(buildingView)
    }

    //Temporär:
    removeBuildingView(buildingView) {
        this.#buildingViews.splice(this.#buildingViews.indexOf(buildingView), 1)
    }

    addOrGetBuilding(buildingId, id) {
        let building = this.getBuildingView(parseInt(id))
        if(building != null) return building
        building = new BuildingView(buildingId, this)
        this.addBuildingView(building)
        return building
    }
}