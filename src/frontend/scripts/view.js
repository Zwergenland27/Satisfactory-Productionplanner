const BuildingView = require("./buildingView")

module.exports = class View {

    #buildingsPresenter
    #designer
    #draggedObject

    constructor(buildingsPresenter) {
        this.#buildingsPresenter = buildingsPresenter
    }

    initializeComponents() {
        this.#buildingsPresenter.getBuildings()
        this.#designer = document.getElementById('designer')
        this.#designer.addEventListener('drop',  this.#dropHandler.bind(this), true)
        this.#designer.addEventListener('dragover', this.#dragoverHandler.bind(this))
    }

    addCategory(category, buildings) {
        let buildingsSelector = document.getElementById('buildings')

        let openCategory = document.createElement('button')
        openCategory.classList.add('collapsible')
        openCategory.id = `collapsible-${category}`
        openCategory.innerText = category

        let categoryContent = document.createElement('div')
        categoryContent.classList.add('collapsible-item')
        categoryContent.id = category

        openCategory.addEventListener('click', (event) => {
            this.#openTierBuildingsList(event, categoryContent)
        })

        buildings.forEach(building => {
            let container = document.createElement('a')

            let buildingView = new BuildingView(building.getId())
            
            let label = document.createElement('label')
            label.innerText = building.name

            container.appendChild(buildingView.createHTML())
            container.appendChild(label)
            categoryContent.appendChild(container)
            //this.#addBuilding(categoryContent, building)
        });

        buildingsSelector.appendChild(openCategory)
        buildingsSelector.appendChild(categoryContent)

    }

    #addBuilding(categoryContent, building) {
        let inputs = building.getInputs()
        let outputs = building.getOutputs()

        let container = document.createElement('a')

        let buildingBounds = document.createElement('div')
        buildingBounds.classList.add('building')
        buildingBounds.style.width =  building.width * 10 - 2 + 'px'
        buildingBounds.style.height =  building.length * 10 - 2 + 'px'
        buildingBounds.setAttribute('draggable', true)
        buildingBounds.addEventListener('dragstart', (event) => {this.#dragstartHandler(event, building, buildingBounds)})

        let interfacePosition =  (building.width * 10) / (inputs.length + 1)
        inputs.forEach(input => {
            let buildingInterface = document.createElement('div')
            buildingInterface.classList.add('interface')
            buildingInterface.classList.add(input.connectionType)
            buildingInterface.style.width = '8px'
            buildingInterface.style.height = '8px'

            buildingInterface.style.left = `${interfacePosition - 5}px`
            buildingInterface.style.top = `-5px`
            interfacePosition += building.width * 10 / (inputs.length + 1)

            buildingBounds.appendChild(buildingInterface)
        })

        interfacePosition =  (building.width * 10) / (outputs.length + 1)
        outputs.forEach(output => {
            let buildingInterface = document.createElement('div')
            buildingInterface.classList.add('interface')
            buildingInterface.classList.add(output.connectionType)
            buildingInterface.style.width = '8px'
            buildingInterface.style.height = '8px'

            buildingInterface.style.left = `${interfacePosition - 5}px`
            buildingInterface.style.top = `${building.length * 10 -2 - 5}px`
            interfacePosition += building.width * 10 / (outputs.length + 1)

            buildingBounds.appendChild(buildingInterface)
        })

        
        let label = document.createElement('label')
        label.innerText = building.name

        container.appendChild(buildingBounds)
        container.appendChild(label)
        categoryContent.appendChild(container)
    }

    #openTierBuildingsList(event, categoryContent) {
        event.srcElement.classList.toggle('opened')
        categoryContent.classList.toggle('opened')

    }

    #dragstartHandler(event, building, buildingBounds, create = true) {
        this.#draggedObject = {}
        this.#draggedObject.create = create
        this.#draggedObject.building = building
        this.#draggedObject.buildingBounds = buildingBounds
        this.#draggedObject.offsetX = event.offsetX
        this.#draggedObject.offsetY = event.offsetY
    }

    #dragoverHandler(event) {
        event.preventDefault()
    }

    #dropHandler(event) {
        let eventData = event.dataTransfer.getData('text').split(';')

        let buildingViewId = eventData[0]
        let buildingId = eventData[1]
        let offsetX = eventData[2]
        let offsetY = eventData[3]

        let buildingView = this.#buildingsPresenter.addOrGetBuilding(buildingId, buildingViewId)

        let x = (event.pageX - event.currentTarget.offsetLeft) - offsetX
        let y = (event.pageY - event.currentTarget.offsetTop) - offsetY

        let newBuildingBounds = buildingView.buildingBounds ?? buildingView.createHTML()

        newBuildingBounds.style.left = `${x}px`
        newBuildingBounds.style.top = `${y}px`

        this.#designer.appendChild(newBuildingBounds)
    }
}