const BuildingInterface = require('./buildingInterface')
const Receipe = require('./recipe')
const Resource = require('./resource')

module.exports = class Building {
    #name
    #category
    #width
    #length
    #interfaces
    #recipe

    /**
     * 
     * @param {String} name 
     * @param {String} category 
     * @param {Number} width 
     * @param {Number} length
     * @param {Array.<String>} inputs Array containing the type of the input interfaces
     * @param {Array.<String>} outputs Array containing the type of the output interfaces
     */
    constructor(name, category, width, length, inputs, outputs) {
        if(!name)                       throw new Error("Missing argument")
        if(typeof name !== 'string')    throw new Error('Invalid argument')
        if(!name)                       throw new Error('Invalid argument')

        if(!category)                   throw new Error('Missing argument')
        if(typeof category !== 'string')throw new Error('Invalid argument')
        if(!category)                   throw new Error('Invalid argument')

        if(!width)                      throw new Error('Missing argument')
        if(typeof width !== 'number')   throw new Error('Invalid argument')
        if(width <= 0)                  throw new Error('Building width must be greater than 0')

        if(!length)                     throw new Error('Missing argument')
        if(typeof length !== 'number')  throw new Error('Invalid argument')
        if(length <= 0)                 throw new Error('Building length must be greater than 0')

        if(!Array.isArray(inputs))       throw new Error('Invalid argument')
        if(!Array.isArray(outputs))      throw new Error('Invalid argument')

        this.#name = name
        this.#category = category
        this.#width = width
        this.#length = length
        this.#interfaces = new Array()
        if(inputs.length > 0) this.#addInputs(inputs)
        if(outputs.length > 0) this.#addOutputs(outputs)
    }

    #addInputs(inputs) {
        inputs.forEach(input => {
            let buildingInterface = new BuildingInterface(
                BuildingInterface.INPUT,
                input
            )
            this.#interfaces.push(buildingInterface) 
        });
    }

    #addOutputs(outputs) {
        outputs.forEach(output => {
            let buildingInterface = new BuildingInterface(
                BuildingInterface.OUTPUT,
                output
            )
            this.#interfaces.push(buildingInterface) 
        });
    }

    get name() {
        return this.#name
    }

    get width () {
        return this.#width
    }
    
    get length() {
        return this.#length
    }

    get category() {
        return this.#category
    }

    /**
     * 
     * @returns {String} Id of the building
     */
    getId() {
        return `${this.#category}.${this.#name}`
    }

    /**
     * 
     * @returns {Array.BuildingInterface}
     */
    getOutputs() {
        let outputs = new Array()
        this.#interfaces.forEach(buildingInterface => {
            if(buildingInterface.direction == BuildingInterface.OUTPUT) outputs.push(buildingInterface)
        })
        return outputs
    }
    
    /**
     * 
     * @returns {Array.BuildingInterface}
     */
    getInputs() {
        let inputs = new Array()
        this.#interfaces.forEach(buildingInterface => {
            if(buildingInterface.direction == BuildingInterface.INPUT) inputs.push(buildingInterface)
        })
        return inputs
    }

    set recipe(recipe) {
        if(!recipe.typeof(Receipe)) throw new Error('Invalid argument')

        this.#recipe = recipe

        recipe.getInputs.forEach(input => {
            console.log(input)
        })
        recipe.getOutputs.forEach(output => {
            console.log(output)
        })
    }

    get recipe() {
        return this.#recipe
    }
}