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

        let openTierBuilingsButton = document.createElement('button')
        openTierBuilingsButton.classList.add('collapsible')
        openTierBuilingsButton.id = `collapsible-${category}`
        openTierBuilingsButton.innerText = category

        let tierBuildingsContent = document.createElement('div')
        tierBuildingsContent.classList.add('collapsible-item')
        tierBuildingsContent.id = category

        openTierBuilingsButton.addEventListener('click', (event) => {
            this.#openTierBuildingsList(event, tierBuildingsContent)
        })

        buildingsSelector.appendChild(openTierBuilingsButton)
        buildingsSelector.appendChild(tierBuildingsContent)

    }

    #openTierBuildingsList(event, tierBuildingsContent) {
        event.srcElement.classList.toggle('opened')
        tierBuildingsContent.classList.toggle('opened')

    }
}