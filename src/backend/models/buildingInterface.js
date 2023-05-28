const Resource = require('./resource')

module.exports = class BuildingInterface {

    static INPUT = 'INPUT'
    static OUTPUT = 'OUTPUT'

    static CONVEYOR = 'SOLID'
    static PIPE = 'FLUID'

    #direction
    #connectionType
    #resource
    #quantity
    
    /**
     * 
     * @param {String} direction INPUT | OUTPUT
     * @param {String} connectionType CONVEYOR | PIPE
     */
    constructor(direction, connectionType) {
        if(direction != BuildingInterface.INPUT && direction != BuildingInterface.OUTPUT)             throw new Error('Invalid interface direction')
        this.#direction = direction
        if(connectionType != BuildingInterface.CONVEYOR && connectionType != BuildingInterface.FLUID) throw new Error('Invalid connection type')
        this.#connectionType = connectionType
    }

    /**
     *
     * @param {Resource} resource 
     * @param {Number} quantity 
     */
    setResource(resource, quantity) {
        if(!resource instanceof Resource)          throw new Error('Invalid argument')
        if(resource.type != this.#connectionType)   throw new Error('Invalid resource type')

        if(typeof quantity !== 'number')            throw new Error('Invalid argument')
        if(quantity <= 0)                           throw new Error('Quantity must be greater than 0')
        
        this.#resource = resource
        this.#quantity = quantity
    }

    get direction() {
        return this.#direction
    }

    get connectionType() {
        return this.#connectionType
    }

    get resource() {
        return this.#resource
    }

    get quantity() {
        return this.#quantity
    }
}