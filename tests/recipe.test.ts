import { Recipe, RecipeResource } from "../src/backend/models/recipe"
import { Resource } from "../src/backend/models/resource";

describe("Tests for RecipeResource class", () => {
    test("constructor setting resource", () => {
        let resource: Resource = new Resource("r1", Resource.SOLID);
        let recipeResource: RecipeResource = new RecipeResource(resource, 10);
        expect(recipeResource.getResource()).toBe(resource);
    })

    test("constructor setting quantity > 0", () => {
        let quantity = 15;
        let recipeResource: RecipeResource = new RecipeResource(new Resource("r1", Resource.SOLID), quantity);
        expect(recipeResource.getQuantity()).toBe(quantity);
    })

    test("constructor setting quantity = 0 throws error", () => {
        expect(() => new RecipeResource(new Resource("r1", Resource.SOLID), 0)).toThrow("Quantity must be larger than 0");
    })

    test("constructor setting quantity < 0 throws error", () => {
        expect(() => new RecipeResource(new Resource("r1", Resource.SOLID), -3)).toThrow("Quantity must be larger than 0");
    })
})

describe("Tests for Recipe class", () => {

    test("constructor initializing empty arrays", () => {
        let recipe: Recipe = new Recipe();
        expect(recipe.getIngredients().length).toBe(0);
        expect(recipe.getProducts().length).toBe(0);
    })

    test("added ingredients will be pushed to ingredients array", () => {
        let recipe: Recipe = new Recipe();

        let resource1: Resource = new Resource("r1", Resource.SOLID);
        let quantity1: number = 10;
        recipe.addIngredient(resource1, quantity1)

        let resource2: Resource = new Resource("r2", Resource.SOLID);
        let quantity2: number = 10;
        recipe.addIngredient(resource2, quantity2)

        expect(recipe.getIngredients()[0].getResource()).toBe(resource1);
        expect(recipe.getIngredients()[0].getQuantity()).toBe(quantity1);

        expect(recipe.getIngredients()[1].getResource()).toBe(resource2);
        expect(recipe.getIngredients()[1].getQuantity()).toBe(quantity2);
    })

    test("added products will be pushed to products array", () => {
        let recipe: Recipe = new Recipe();

        let resource1: Resource = new Resource("r1", Resource.SOLID);
        let quantity1: number = 10;
        recipe.addProduct(resource1, quantity1)

        let resource2: Resource = new Resource("r2", Resource.SOLID);
        let quantity2: number = 10;
        recipe.addProduct(resource2, quantity2)

        expect(recipe.getProducts()[0].getResource()).toBe(resource1);
        expect(recipe.getProducts()[0].getQuantity()).toBe(quantity1);

        expect(recipe.getProducts()[1].getResource()).toBe(resource2);
        expect(recipe.getProducts()[1].getQuantity()).toBe(quantity2);
    })
})