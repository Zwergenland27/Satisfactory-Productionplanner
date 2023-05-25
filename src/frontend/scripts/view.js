module.exports = class View {
    #buildingsPresenter
    constructor(buildingsPresenter) {
        this.#buildingsPresenter = buildingsPresenter
    }

    initializeComponents() {
        this.#buildingsPresenter.getBuildings()
    }

    addTier(category, buildings) {
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
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute('width', building.width)
        svg.setAttribute('height', building.height)

        let buildingBoundes = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        buildingBoundes.setAttribute('width', building.width)
        buildingBoundes.setAttribute('height', building.height)
        buildingBoundes.setAttribute('fill', '#FFFFFF')

        
        let label = document.createElement('label')
        label.innerText = building.name

        svg.appendChild(buildingBoundes)
        container.appendChild(svg)
        container.appendChild(label)
        categoryContent.appendChild(container)
    }

    #openTierBuildingsList(event, categoryContent) {
        event.srcElement.classList.toggle('opened')
        categoryContent.classList.toggle('opened')

    }
}