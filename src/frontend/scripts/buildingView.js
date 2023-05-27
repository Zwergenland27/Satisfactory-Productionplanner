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
            let buildingInterface = document.createElement('div')
            buildingInterface.classList.add('interface')
            buildingInterface.classList.add(input.connectionType)
            buildingInterface.style.width = '8px'
            buildingInterface.style.height = '8px'

            buildingInterface.style.left = `${interfacePosition - 5}px`
            buildingInterface.style.top = `-5px`
            interfacePosition += this.#building.width * 10 / (inputs.length + 1)

            this.#buildingBounds.appendChild(buildingInterface)
        })

        interfacePosition =  (this.#building.width * 10) / (outputs.length + 1)
        outputs.forEach(output => {
            let buildingInterface = document.createElement('div')
            buildingInterface.classList.add('interface')
            buildingInterface.classList.add(output.connectionType)
            buildingInterface.style.width = '8px'
            buildingInterface.style.height = '8px'

            buildingInterface.style.left = `${interfacePosition - 5}px`
            buildingInterface.style.top = `${this.#building.length * 10 -2 - 5}px`
            interfacePosition += this.#building.width * 10 / (outputs.length + 1)

            this.#buildingBounds.appendChild(buildingInterface)
        })
        return this.#buildingBounds
    }

    #createInterface(buildingInterface, width, height, top = true) {

    }
}