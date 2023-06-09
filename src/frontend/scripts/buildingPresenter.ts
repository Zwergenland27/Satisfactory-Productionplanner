import { BuildingsModel } from "../../backend/models/buildingsModel"
import { BuildingView } from "./buildingView"
import { View } from "./view"

export class BuildingPresenter {
    private model: BuildingsModel
    private view: View

    private buildingViews: BuildingView[]

    constructor (buildingsModel: BuildingsModel) {
        this.model = buildingsModel
        this.view = null!
        this.buildingViews = new Array()
    }

    setView(view: View): void {
        this.view = view
    }

    getBuildings(): void {
        let categories = this.model.getCategories()

        categories.forEach(category => {
            let buildings = this.model.getBuildingsOfCategory(category)
            this.view.addCategory(category, buildings)
        });
    }

    //Temporär:
    getBuildingView(id: number): BuildingView {
        let returnBuildingView: BuildingView = null!
        this.buildingViews.forEach(buildingView => {
            if(buildingView.getBuilding().getNumericId() == id) returnBuildingView = buildingView
        })
        return returnBuildingView
    }

    //Temporär:
    addBuildingView(buildingView: BuildingView): void {
        this.buildingViews.push(buildingView)
    }

    //Temporär:
    removeBuildingView(buildingView: BuildingView): void {
        this.buildingViews.splice(this.buildingViews.indexOf(buildingView), 1)
    }

    addOrGetBuildingView(buildingId: string, id: number): BuildingView {
        let building: BuildingView = this.getBuildingView(id)
        if(building != null) return building
        building = new BuildingView(buildingId, this)
        this.addBuildingView(building)
        return building
    }
}