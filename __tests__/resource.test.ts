import { Resource } from "../src/backend/models/resource";

describe("Tests for Resource class", () => {
    test("empty name", () => {
        expect(() => new Resource("", "SOLID")).toThrow("Invalid name")
        expect(() => new Resource("   ", "SOLID")).toThrow("Invalid name")
    })

    test("name set", () => {
        let resource:Resource = new Resource("r1", "SOLID");
        expect(resource.getName()).toBe("r1");
    })

    test("remove unneccessary spaces on name", () => {
        let resource: Resource = new Resource(" r1 ", "SOLID");
        expect(resource.getName()).toBe("r1");
        
        resource = new Resource(" r 2 ", "SOLID");
        expect(resource.getName()).toBe("r 2");
    })

    test("invalid type", () => {
        expect(() => new Resource("r1", "")).toThrow("Invalid resource type");
        expect(() => new Resource("r1", "   ")).toThrow("Invalid resource type");
        expect(() => new Resource("r2", "hans")).toThrow("Invalid resource type");
        expect(() => new Resource("r3", "solid")).toThrow("Invalid resource type");
        expect(() => new Resource("r4", "fluid")).toThrow("Invalid resource type");
    })

    test("valid type", () => {
        let resource:Resource = new Resource("r1", Resource.SOLID);
        expect(resource.getType()).toBe(Resource.SOLID);
        
        resource = new Resource("r2", Resource.FLUID);
        expect(resource.getType()).toBe(Resource.FLUID)
    })
})