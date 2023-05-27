const Building = require("../../backend/models/building")

module.exports = class BuildingView {

    static #lastId = 0

    #building
    #buildingBounds
    #positionX
    #positionY
    #rotation
    #id

    constructor(buildingId) {
        this.#building = Building.createBuilding(buildingId)
        this.#id = BuildingView.#lastId
        BuildingView.#lastId++
    }

    set positionX(x) {

    }

    set positionY(y) {

    }

    get id() {
        return this.#id
    }

    get buildingBounds() {
        return this.#buildingBounds
    }

    rotate(angle) {

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
                event.dataTransfer.setData('text/plain', `${this.#id};${this.#building.getId()};${event.offsetX};${event.offsetY}`)
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