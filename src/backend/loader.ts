import { Building, BuildingCategory } from "../satisfactory/building";
import { buildings } from "../res/buildings.json";
import { BuildingInterface, InterfaceConnectionType, InterfaceDirection } from "../satisfactory/buildingInterface";

interface BuildingInterfaceTemplate {
    direction: string;
    connectionType: string;
}

interface BuildingTemplate {
    name: string;
    id: string;
    category: string;
    width: number;
    length: number;
    interfaces: BuildingInterfaceTemplate[]
}

export class BuildingsLoader {
    private static buildings: Building[] = new Array();

    /**
     * @description Load all buildings from res/buildings.json.
     */
    static loadBuildings() {
        let buildingTemplaes: BuildingTemplate[] = buildings as BuildingTemplate[];
        buildingTemplaes.forEach(buildingTemplate => {
            this.buildings.push(this.createBuilding(buildingTemplate));
        })
    }

    /**
     * @description Attention: BuildingsLoader.loadBuildings() must be called before using this method!
     * @param id Building specific Id of the object to clone
     * @returns a clone of the Building, only with initial values (see Building.clone()) If no matching building is found, null is returned
     */
    static getBuilding(id: string): Building {
        let buildingFound: Building = null!;
        this.buildings.forEach(building => {
            if(building.getId() == id){
                buildingFound = building.clone();
            }
        });
        return buildingFound;
    }

    /**
     * 
     * @returns an array of all Buildings
     */
    static getBuildings(): Building[] {
        return this.buildings;
    }

    private static createBuilding(buildingTemplate: BuildingTemplate): Building {
        let buildingInterfaces: BuildingInterface[] =  new Array();
        
        buildingTemplate.interfaces.forEach(buildingInterfaceTemplate => {
            let buildingInterface: BuildingInterface = new BuildingInterface(
                this.getInterfaceDirection(buildingInterfaceTemplate.direction),
                this.getConnectionType(buildingInterfaceTemplate.connectionType));
            buildingInterfaces.push(buildingInterface);
        })

        let building: Building = new Building(
            buildingTemplate.name,
            this.getBuildingCategory(buildingTemplate.category),
            buildingTemplate.width,
            buildingTemplate.length,
            buildingInterfaces);

        return building;
    }

    private static getBuildingCategory(templateCategory: string): BuildingCategory {
        switch(templateCategory){
            case BuildingCategory.LOGISTICS: return BuildingCategory.LOGISTICS;
            case BuildingCategory.MANUFACTURERS: return BuildingCategory.MANUFACTURERS;
            case BuildingCategory.SMELTERS: return BuildingCategory.SMELTERS;
            case BuildingCategory.MINERS: return BuildingCategory.MINERS;
            case BuildingCategory.FLUID_EXTRACTORS: return BuildingCategory.FLUID_EXTRACTORS;
            default: return null!;
        }
    }

    private static getInterfaceDirection(templateDirection: string): InterfaceDirection {
        switch(templateDirection){
            case InterfaceDirection.INPUT: return InterfaceDirection.INPUT;
            case InterfaceDirection.OUTPUT: return InterfaceDirection.OUTPUT;
            default: return null!;
        }
    }

    private static getConnectionType(templateConnectionType: string): InterfaceConnectionType {
        switch(templateConnectionType){
            case InterfaceConnectionType.CONVEYOR: return InterfaceConnectionType.CONVEYOR;
            case InterfaceConnectionType.PIPE: return InterfaceConnectionType.PIPE;
            default: return null!;
        }
    }
}