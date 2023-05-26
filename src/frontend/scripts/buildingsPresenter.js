module.exports = class BuildingsPresenter {
    #model
    #view

    constructor (buildingsModel) {
        this.#model = buildingsModel
    }

    set view(view) {
        this.#view = view
    }

    getBuildings() {
        let categories = this.#model.getCategories()

        categories.forEach(category => {
            let buildings = this.#model.getBuildingsOfCategory(category)
            this.#view.addCategory(category, buildings)
        });
    }
}