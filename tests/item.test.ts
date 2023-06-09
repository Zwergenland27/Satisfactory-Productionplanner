import { Item, ItemType } from "../src/satisfactory/item";

describe("Tests for Resource class", () => {
    test("empty name throws error", () => {
        expect(() => new Item("", ItemType.SOLID)).toThrow("Invalid item name")
        expect(() => new Item("   ", ItemType.SOLID)).toThrow("Invalid item name")
    })

    test("name set", () => {
        let resource:Item = new Item("r1", ItemType.SOLID);
        expect(resource.getName()).toBe("r1");
    })

    test("remove unneccessary spaces on name", () => {
        let resource: Item = new Item(" r1 ", ItemType.SOLID);
        expect(resource.getName()).toBe("r1");
        
        resource = new Item(" r 2 ", ItemType.SOLID);
        expect(resource.getName()).toBe("r 2");
    })

    test("valid type", () => {
        let resource:Item = new Item("r1", ItemType.SOLID);
        expect(resource.getType()).toBe(ItemType.SOLID);
        
        resource = new Item("r2", ItemType.FLUID);
        expect(resource.getType()).toBe(ItemType.FLUID)
    })
})