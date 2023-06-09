import { Item } from "./item"

export class RecipeItem {
    private resource: Item;
    private quantity: number;

    constructor(resource: Item, quantity: number) {
        if(quantity <= 0) throw new Error("Quantity must be larger than 0");
        this.resource = resource;
        this.quantity = quantity;
    }

    getResource(): Item {
        return this.resource;
    }

    getQuantity(): number {
        return this.quantity;
    }
}

export class Recipe {
    
    private ingredients: RecipeItem[];
    private products: RecipeItem[];
    
    constructor() {
        this.ingredients = new Array();
        this.products = new Array();
    }

    addIngredient(resource: Item, quantity: number): void {
        let ingredient = new RecipeItem(resource, quantity);
        this.ingredients.push(ingredient)
    }

    addProduct(resource: Item, quantity: number): void {let product = new RecipeItem(resource, quantity);
        this.products.push(product);
    }

    getIngredients() {
        return this.ingredients;
    }

    getProducts() {
        return this.products;
    }
}