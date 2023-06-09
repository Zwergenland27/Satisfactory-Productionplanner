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
        if(amount <= 0) throw new Error("Amount must be greater than 0");
        this.item = item;
        this.amount = amount;
    }

    /**
     * 
     * @returns the item that is used for the recipe
     */
    getResource(): Item {
        return this.item;
    }

    /**
     * 
     * @returns the amount of items that are required for the recipe
     */
    getQuantity(): number {
        return this.amount;
    }
}

export class Recipe {
    
    private ingredients: RecipePart[];
    private products: RecipePart[];
    private allowedBuildings: string[];
    
    constructor() {
        this.ingredients = new Array();
        this.products = new Array();
        this.allowedBuildings = new Array();
    }

    /**
     * @description Add a building, in which this recipe can be used
     * @param buildingId The building specific id
     */
    addAllowedBuilding(buildingId: string): void {
        buildingId = buildingId.trim();
        if(buildingId.length == 0) throw new Error("Invalid building id");
        this.allowedBuildings.push(buildingId);
    }

    /**
     * 
     * @param buildingId The building specific id
     * @returns true if the recipe can be used in the building, false otherwise
     */
    isAllowedInBuilding(buildingId: string): boolean {
        let allowed = false;
        this.allowedBuildings.forEach(allowedBuilding => {
            if(allowedBuilding == buildingId) allowed = true;
        })
        return allowed;
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

    /**
     * 
     * @returns Array of items (and their amount) needed for this recipe
     */
    getIngredients(): RecipePart[] {
        return this.ingredients;
    }

    /**
     * 
     * @returns Array of items (and their amount) produced by this recipe
     */
    getProducts(): RecipePart[] {
        return this.products;
    }
}