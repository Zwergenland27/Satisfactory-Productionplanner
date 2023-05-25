const {ipcRenderer} = require('electron')
const Titlebar = require('../frontend/scripts/titlebar')
const View = require('../frontend/scripts/view')
const BuildingsModel = require('../backend/models/buildingsModel')
const BuildingsPresenter = require('../frontend/scripts/buildingsPresenter')

window.addEventListener('DOMContentLoaded', () => {
    new Titlebar();

    let buildingsModel = new BuildingsModel()
    let buildingsPresenter = new BuildingsPresenter(buildingsModel)
    let view = new View(buildingsPresenter)
    buildingsPresenter.view = view

    view.initializeComponents()
})