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
            this.#addBuilding(categoryContent, building)
        });

        buildingsSelector.appendChild(openCategory)
        buildingsSelector.appendChild(categoryContent)

    }

    #addBuilding(categoryContent, building) {
        let container = document.createElement('a')
        

        let buildingBounds = document.createElement('div')
        buildingBounds.style.width =  building.width * 10 - 2 + 'px'
        buildingBounds.style.height =  building.length * 10 - 2 + 'px'
        buildingBounds.setAttribute('draggable', true)
        buildingBounds.addEventListener('dragstart', (event) => {this.#dragstartHandler(event, building, buildingBounds)})

        
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
        let draggedObject = this.#draggedObject
        this.#draggedObject = null

        let x = (event.pageX - event.currentTarget.offsetLeft) - draggedObject.offsetX
        let y = (event.pageY - event.currentTarget.offsetTop) - draggedObject.offsetY

        let newBuildingBounds = draggedObject.create ? draggedObject.buildingBounds.cloneNode() : draggedObject.buildingBounds
        newBuildingBounds.addEventListener('dragstart', (event) => {this.#dragstartHandler(event,  draggedObject.building, newBuildingBounds, false)})

        newBuildingBounds.style.left = `${x}px`
        newBuildingBounds.style.top = `${y}px`

        this.#designer.appendChild(newBuildingBounds)
    }
}