import { Building, BuildingCategory } from "../src/satisfactory/building"
import { BuildingInterface, InterfaceConnectionType, InterfaceDirection } from "../src/satisfactory/buildingInterface";


describe("Tests for Building class constructor", () => {

    let building: Building;
    let inputs: BuildingInterface[];
    let outputs: BuildingInterface[];

    beforeAll(() => {
        inputs = new Array();
        outputs = new Array();
        inputs.push(new BuildingInterface(InterfaceDirection.INPUT, InterfaceConnectionType.CONVEYOR));
        inputs.push(new BuildingInterface(InterfaceDirection.INPUT, InterfaceConnectionType.PIPE));
        outputs.push(new BuildingInterface(InterfaceDirection.OUTPUT, InterfaceConnectionType.CONVEYOR));

        building = new Building("Name", BuildingCategory.LOGISTICS, 10, 8, [...inputs, ... outputs]);
    })

    test("name, category, width, length are set in constructor", () => {
        expect(building.getName()).toBe("Name");
        expect(building.getCategory()).toBe(BuildingCategory.LOGISTICS);
        expect(building.getWidth()).toBe(10);
        expect(building.getLength()).toBe(8);
    })

    test("inputs are set in constructor", () => {
        expect(building.getInputs()).toStrictEqual(inputs);
    })

    test("outputs are set in constructor", () => {
        expect(building.getOutputs()).toStrictEqual(outputs);
    })

    test("numeric id is set in constructor", () => {
        expect(building.getNumericId()).toBe(0);
    })

    test("empty name in constructor throws error", () => {
        expect(() => new Building("", BuildingCategory.LOGISTICS, 10, 8, inputs)).toThrow("Invalid building name")
        expect(() => new Building("   ", BuildingCategory.LOGISTICS, 10, 8, inputs)).toThrow("Invalid building name")
    })

    test("remove unneccessary spaces on name in constructor", () => {
        let building: Building = new Building(" Name ", BuildingCategory.LOGISTICS, 10, 8, inputs);
        expect(building.getName()).toBe("Name");
        
        building = new Building(" Noch ein Namensteil ", BuildingCategory.LOGISTICS, 10, 8, inputs);
        expect(building.getName()).toBe("Noch ein Namensteil");
    })

    test("setting width = 0 in constructor throws error", () => {
        expect(() => new Building("Name", BuildingCategory.LOGISTICS, 0, 8, inputs)).toThrow("Building width must be greater than 0");
    })

    test("setting width < 0 in constructor throws error", () => {
        expect(() => new Building("Name", BuildingCategory.LOGISTICS, -4, 8, inputs)).toThrow("Building width must be greater than 0");
    })

    test("setting length = 0 in constructor throws error", () => {
        expect(() => new Building("Name", BuildingCategory.LOGISTICS, 3, 0, inputs)).toThrow("Building length must be greater than 0");
    })

    test("setting length < 0 in constructor throws error", () => {
        expect(() => new Building("Name", BuildingCategory.LOGISTICS, 3, -8, inputs)).toThrow("Building length must be greater than 0");
    })

    test("setting empty interfaces array in constructor throws error", () => {
        let emptyInterfaces: BuildingInterface[] = new Array();
        expect(() => new Building("Name", BuildingCategory.LOGISTICS, 3, 8, emptyInterfaces)).toThrow("Building must have at least one interface");
    })

    test("numeric id is automatically incremented", () => {
        let building1: Building = new Building("Name", BuildingCategory.LOGISTICS, 10, 8, inputs);
        let building2: Building = new Building("Name", BuildingCategory.LOGISTICS, 10, 8, inputs);
        expect(building2.getNumericId()).toBe(building1.getNumericId() + 1);
    })
})

describe("Tests for building class", () => {

    let building: Building;
    let inputs: BuildingInterface[];
    let outputs: BuildingInterface[];

    beforeAll(() => {
        inputs = new Array();
        outputs = new Array();
        inputs.push(new BuildingInterface(InterfaceDirection.INPUT, InterfaceConnectionType.CONVEYOR));
        inputs.push(new BuildingInterface(InterfaceDirection.INPUT, InterfaceConnectionType.PIPE));
        outputs.push(new BuildingInterface(InterfaceDirection.OUTPUT, InterfaceConnectionType.CONVEYOR));

        building = new Building("Name", BuildingCategory.LOGISTICS, 10, 8, [...inputs, ... outputs]);
    })

    test("clone is exact copy of object, with new id", () => {
        let originalBuilding: Building = new Building("Name", BuildingCategory.LOGISTICS, 10, 8, inputs);
        let cloneBulding: Building = originalBuilding.clone();

        expect(cloneBulding.getName()).toBe(originalBuilding.getName());
        expect(cloneBulding.getCategory()).toBe(originalBuilding.getCategory());
        expect(cloneBulding.getWidth()).toBe(originalBuilding.getWidth());
        expect(cloneBulding.getLength()).toBe(originalBuilding.getLength());
        expect(cloneBulding.getOutputs()).toStrictEqual(originalBuilding.getOutputs());
        expect(cloneBulding.getInputs()).toStrictEqual(originalBuilding.getInputs());
        expect(cloneBulding.getNumericId()).not.toBe(originalBuilding.getNumericId)
    })
})