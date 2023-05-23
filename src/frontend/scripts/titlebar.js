module.exports = class Titlebar {
    constructor(ipcRenderer, menu){
        this.ipcRenderer = ipcRenderer;
        this.#create()
        this.#setWindowHandler()
    }

    #create() {
        let nav = document.getElementById('titlebar')

        let menu = document.createElement('div')
        menu.id = 'menu'
        
        let title = document.createElement('span')
        title.innerText = document.querySelector('title').innerText

        let controls = document.createElement('div')
        controls.classList =  'controls'

        this.minimizeWindow = document.createElement('span')
        this.minimizeWindow.id = 'window-minimize'
        this.minimizeWindow.innerHTML = '&#xE921;'
        controls.appendChild(this.minimizeWindow)

        this.maximizeWindow = document.createElement('span')
        this.maximizeWindow.id = 'window-maximize'
        this.maximizeWindow.innerHTML = '&#xE922;'
        controls.appendChild(this.maximizeWindow)

        this.unmaximizeWindow = document.createElement('span')
        this.unmaximizeWindow.id = 'window-unmaximize'
        this.unmaximizeWindow.innerHTML = '&#xE923;'
        this.unmaximizeWindow.hidden = true
        controls.appendChild(this.unmaximizeWindow)

        this.closeWindow = document.createElement('span')
        this.closeWindow.id = 'window-close'
        this.closeWindow.innerHTML = '&#xE8BB;'
        controls.appendChild(this.closeWindow)

        nav.appendChild(menu)
        nav.appendChild(title)
        nav.appendChild(controls)
    }

    #setWindowHandler() {
        this.minimizeWindow.addEventListener('click', this.#controlHandler.bind(this), false)
        this.maximizeWindow.addEventListener('click', this.#controlHandler.bind(this), false)
        this.unmaximizeWindow.addEventListener('click', this.#controlHandler.bind(this), false)
        this.closeWindow.addEventListener('click', this.#controlHandler.bind(this), false)

        this.ipcRenderer.on('window-control', this.#handleMaximize.bind(this))
    }

    #controlHandler(event) {
        this.ipcRenderer.send("window-control", event.srcElement.id)
    }

    #handleMaximize(event, type) {
        switch(type){
            case 'window-maximized': this.maximizeWindow.hidden = true; this.unmaximizeWindow.hidden = false; break;
            case 'window-unmaximized': this.maximizeWindow.hidden = false; this.unmaximizeWindow.hidden = true; break;
        }
    }
}