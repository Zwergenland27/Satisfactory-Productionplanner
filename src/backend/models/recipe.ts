import { Resource } from "./resource"

export class RecipeResource {
    private resource: Resource;
    private quantity: number;

    constructor(resource: Resource, quantity: number) {
        //test
        //if(quantity <= 0) throw new Error("Quantity must be larger than 0");
        this.resource = resource;
        this.quantity = quantity;
    }

    getResource(): Resource {
        return this.resource;
    }

    getQuantity(): number {
        return this.quantity;
    }
}

export class Recipe {
    
    private ingredients: RecipeResource[];
    private products: RecipeResource[];
    
    constructor() {
        this.ingredients = new Array();
        this.products = new Array();
    }

    addIngredient(resource: Resource, quantity: number): void {
        let ingredient = new RecipeResource(resource, quantity);
        this.ingredients.push(ingredient)
    }

    addProduct(resource: Resource, quantity: number): void {let product = new RecipeResource(resource, quantity);
        this.products.push(product)
    }

    getIngredients() {
        return this.ingredients
    }

    getProducts() {
        return this.products
    }
}