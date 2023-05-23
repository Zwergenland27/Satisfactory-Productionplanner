const {ipcRenderer} = require('electron')
const Titlebar = require('../frontend/scripts/titlebar')
const View = require('../frontend/scripts/view')

window.addEventListener('DOMContentLoaded', () => {
    new Titlebar();
    let view = new View(ipcRenderer)
})