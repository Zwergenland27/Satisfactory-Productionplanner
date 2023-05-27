const Building = require("../../backend/models/building")

module.exports = class BuildingView {

    static #lastId = 0
    static #creatingConnection
    
    #id
    #building

    #buildingBounds
    #positionX
    #positionY
    #rotation

    constructor(buildingId) {
        this.#building = Building.createBuilding(buildingId)
        this.#rotation = 0
        BuildingView.#creatingConnection = false
        this.#id = BuildingView.#lastId
        BuildingView.#lastId++
    }

    set positionX(x) {
        if(typeof x !== 'number') throw Error('Position must be a number!')
        if(x < 0) throw Error('Position must be positive')

        this.#positionX = x
        this.#buildingBounds.style.left = `${this.#positionX}px`
    }

    set positionY(y) {
        if(typeof y !== 'number') throw Error('Position must be a number!')
        if(y < 0) throw Error('Position must be positive')

        this.#positionY = y
        this.#buildingBounds.style.top = `${this.#positionY}px`
    }

    get id() {
        return this.#id
    }

    get buildingBounds() {
        return this.#buildingBounds
    }

    rotate(angle) {

    }

    static stopCreatingConnection() {
        BuildingView.#creatingConnection = false
    }

    createHTML() {
        let inputs = this.#building.getInputs()
        let outputs = this.#building.getOutputs()

        this.#buildingBounds = document.createElement('div')
        this.#buildingBounds.classList.add('building')
        this.#buildingBounds.style.width =  this.#building.width * 10 - 2 + 'px'
        this.#buildingBounds.style.height =  this.#building.length * 10 - 2 + 'px'
        this.#buildingBounds.setAttribute('draggable', true)

        this.#buildingBounds.addEventListener('dragstart', (event) => {
            if(BuildingView.#creatingConnection) {
                event.preventDefault()
                return
            }
            event.dataTransfer.setData('text/plain', `${this.#id};${this.#building.getId()};${event.offsetX};${event.offsetY}`)
        })
        this.#buildingBounds.addEventListener('click', () => {
            this.#buildingBounds.classList.toggle('selected')
        })
        this.#buildingBounds.addEventListener('mousedown', (event) => {
            if(!event.target.classList.contains('interface')) return;
            BuildingView.#creatingConnection = true
        })

        let interfacePosition =  (this.#building.width * 10) / (inputs.length + 1)
        inputs.forEach(input => {
            this.#buildingBounds.appendChild(this.#createInterface(input.connectionType, interfacePosition, 0))
            interfacePosition += this.#building.width * 10 / (inputs.length + 1)
        })

        interfacePosition =  (this.#building.width * 10) / (outputs.length + 1)
        outputs.forEach(output => {
            this.#buildingBounds.appendChild(this.#createInterface(output.connectionType, interfacePosition, this.#building.length * 10 - 2))
            interfacePosition += this.#building.width * 10 / (outputs.length + 1)
        })
        return this.#buildingBounds
    }

    #createInterface(connectionType, xPos, yPos) {
        let buildingInterfaceBounds = document.createElement('div')
        buildingInterfaceBounds.classList.add('interface')
        buildingInterfaceBounds.classList.add(connectionType)
        buildingInterfaceBounds.style.width = '8px'
        buildingInterfaceBounds.style.height = '8px'

        buildingInterfaceBounds.style.left = `${xPos - 5}px`
        buildingInterfaceBounds.style.top = `${yPos - 5}px`

        return buildingInterfaceBounds
    }
}