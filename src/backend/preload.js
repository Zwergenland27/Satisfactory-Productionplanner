const {ipcRenderer} = require('electron')
const View = require('../frontend/scripts/view')

window.addEventListener('DOMContentLoaded', () => {
    let view = new View(ipcRenderer)
})