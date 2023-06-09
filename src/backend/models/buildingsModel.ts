import { BuildingsLoader } from "../loader";
import { Building, BuildingCategory } from "../../satisfactory/building"

export class BuildingsModel {

    constructor() {
        BuildingsLoader.loadBuildings();
    }

    getCategories(): BuildingCategory[] {
        return Building.getCategories();
    }

    getBuildingsOfCategory(category: BuildingCategory): Building[] {
        let buildingsOfCategory: Building[] = new Array();
        BuildingsLoader.getBuildings().forEach(building => {
            if(building.getCategory() == category) buildingsOfCategory.push(building);
        })
        return buildingsOfCategory;
    }
}