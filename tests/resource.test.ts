import { Resource, ResourceType } from "../src/satisfactory/resource";

describe("Tests for Resource class", () => {
    test("empty name throws error", () => {
        expect(() => new Resource("", ResourceType.SOLID)).toThrow("Invalid name")
        expect(() => new Resource("   ", ResourceType.SOLID)).toThrow("Invalid name")
    })

    test("name set", () => {
        let resource:Resource = new Resource("r1", ResourceType.SOLID);
        expect(resource.getName()).toBe("r1");
    })

    test("remove unneccessary spaces on name", () => {
        let resource: Resource = new Resource(" r1 ", ResourceType.SOLID);
        expect(resource.getName()).toBe("r1");
        
        resource = new Resource(" r 2 ", ResourceType.SOLID);
        expect(resource.getName()).toBe("r 2");
    })

    test("valid type", () => {
        let resource:Resource = new Resource("r1", ResourceType.SOLID);
        expect(resource.getType()).toBe(ResourceType.SOLID);
        
        resource = new Resource("r2", ResourceType.FLUID);
        expect(resource.getType()).toBe(ResourceType.FLUID)
    })
})