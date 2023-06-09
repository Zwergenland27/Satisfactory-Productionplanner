import { Item } from "./item"

export class RecipePart {
    private item: Item;
    private amount: number;

    /**
     *
     * @param item The item that is used for the recipe
     * @param amount The amount of items needed for the recipe
     */
    constructor(item: Item, amount: number) {
        if(amount <= 0) throw new Error("Amount must be larger than 0");
        this.item = item;
        this.amount = amount;
    }

    /**
     * 
     * @returns The item, that is used for the recipe
     */
    getResource(): Item {
        return this.item;
    }

    /**
     * 
     * @returns The amount of items that are required for the recipe
     */
    getQuantity(): number {
        return this.amount;
    }
}

export class Recipe {
    
    private ingredients: RecipePart[];
    private products: RecipePart[];
    
    constructor() {
        this.ingredients = new Array();
        this.products = new Array();
    }

    /**
     * @description Add an ingredient to this recipe
     * @param item  The item that should be added as an ingredient
     * @param amount The amount of the items that are needed for this recipe
     */
    addIngredient(item: Item, amount: number): void {
        let ingredient = new RecipePart(item, amount);
        this.ingredients.push(ingredient)
    }

    /**
     * @description Add a product item to this recipe
     * @param item The item that should be added as an product
     * @param amount The amount of the items that are generated from this recipe
     */
    addProduct(item: Item, amount: number): void {
        let product = new RecipePart(item, amount);
        this.products.push(product);
    }

    getIngredients() {
        return this.ingredients;
    }

    getProducts() {
        return this.products;
    }
}