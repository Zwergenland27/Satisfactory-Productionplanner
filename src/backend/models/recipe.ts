import { Resource } from "./resource"

export class Recipe {
    
    private ingredients: Resource[]
    private products: Resource[]
    
    constructor() {
        this.ingredients = new Array()
        this.products = new Array()
    }

    addIngredient(resource: Resource, quantity: number): void {
        if(quantity <= 0)                   throw new Error('Quantity must be larger than 0')

        this.ingredients.push(resource)
        //how to add quantity
    }

    addProduct(resource: Resource, quantity: number): void {
        if(quantity <= 0)                  throw new Error('Quantity must be larger than 0')

        this.products.push(resource)
        //how to add quantity
    }

    getIngredients() {
        return this.ingredients
    }

    getProducts() {
        return this.products
    }
}