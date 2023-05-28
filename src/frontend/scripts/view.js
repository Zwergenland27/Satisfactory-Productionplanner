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
        document.addEventListener('mouseup', () => {
            BuildingView.stopCreatingConnection()
        })
        document.addEventListener('keydown', (event) => {
            BuildingView.currentlySelected.forEach(selectedBuildingView => {
                selectedBuildingView.keyPress(event)
            })
        })
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

            let buildingView = new BuildingView(building.getId(), this.#buildingsPresenter, true)
            
            let label = document.createElement('label')
            label.innerText = building.name

            container.appendChild(buildingView.createHTML())
            container.appendChild(label)
            categoryContent.appendChild(container)
        });

        buildingsSelector.appendChild(openCategory)
        buildingsSelector.appendChild(categoryContent)

    }

    #openTierBuildingsList(event, categoryContent) {
        event.srcElement.classList.toggle('opened')
        categoryContent.classList.toggle('opened')

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

        buildingView.positionX = x
        buildingView.positionY = y

        this.#designer.appendChild(newBuildingBounds)
    }
}