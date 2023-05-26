const Resource = require('./resource')

module.exports = class Receipe {
    #ingredients
    #products
    
    constructor() {
        this.#ingredients = new Array()
        this.#products = new Array()
    }

    /**
     * 
     * @param {Resource} resource 
     * @param {Number} quantity 
     */
    addIngredient(resource, quantity) {
        if(typeof resource !== 'resource')  throw new Error('Invalid argument')

        if(typeof quantity !== 'number')    throw new Error('Invalid argument')
        if(quantity <= 0)                   throw new Error('Quantity must be larger than 0')

        this.#ingredients.push({
            resource: resource,
            quantity: quantity
        })
    }

    /**
     * 
     * @param {Resource} resource 
     * @param {Number} quantity 
     */
    addProduct(resource, quantity) {
        if(!resource.typeof(Resource))  throw new Error('Invalid argument')

        if(!quantity.typeof(Number))    throw new Error('Invalid argument')
        if(quantity <= 0)               throw new Error('Quantity must be larger than 0')

        this.#products.push({
            resource: resource,
            quantity: quantity
        })
    }

    get ingredients() {
        return this.#ingredients
    }

    get products() {
        return this.#products
    }
}