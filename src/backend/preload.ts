import { Titlebar } from "../frontend/scripts/titlebar"
import { View } from "../frontend/scripts/view"
import {BuildingsModel} from "../backend/models/buildingsModel"
import {BuildingsPresenter} from "../frontend/scripts/buildingsPresenter"

window.addEventListener("DOMContentLoaded", () => {
    new Titlebar();

    let buildingsModel: BuildingsModel = new BuildingsModel();
    let buildingsPresenter: BuildingsPresenter = new BuildingsPresenter(buildingsModel);
    let view: View = new View(buildingsPresenter);
    buildingsPresenter.setView(view);

    view.initializeComponents();
})