import { Titlebar } from "../frontend/scripts/titlebar"
import { View } from "../frontend/scripts/view"
import {BuildingsModel} from "../backend/models/buildingsModel"
import {BuildingPresenter} from "../frontend/scripts/buildingPresenter"

window.addEventListener("DOMContentLoaded", () => {
    new Titlebar(window);

    let buildingsModel: BuildingsModel = new BuildingsModel();
    let buildingsPresenter: BuildingPresenter = new BuildingPresenter(buildingsModel);
    let view: View = new View(buildingsPresenter);
    buildingsPresenter.setView(view);

    view.initializeComponents();
})