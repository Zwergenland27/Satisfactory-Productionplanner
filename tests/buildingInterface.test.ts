import { BuildingInterface, InterfaceConnectionType, InterfaceDirection } from "../src/satisfactory/buildingInterface"
import { Item, ItemType } from "../src/satisfactory/item";

describe("Tests for BuildingInterface class", () => {

    let buildingInterface: BuildingInterface;

    beforeAll(() => {
        buildingInterface = new BuildingInterface(InterfaceDirection.INPUT, InterfaceConnectionType.CONVEYOR);
    })

    test("direction will be set in constructor", () => {
        expect(buildingInterface.getDirection()).toBe(InterfaceDirection.INPUT);
    })

    test("connection type will be set in constructor", () => {
        expect(buildingInterface.getConnectionType()).toBe(InterfaceConnectionType.CONVEYOR);
    })

    test("setItem will set item and storage amount", () => {
        let item: Item = new Item("Itemname", ItemType.SOLID);
        buildingInterface.setItem(item, 10);

        expect(buildingInterface.getResource()).toBe(item);
        expect(buildingInterface.getStorageAmount()).toBe(10);
    })
})