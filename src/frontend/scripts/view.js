module.exports = class View {
    constructor(ipcRenderer) {
        this.ipcRenderer = ipcRenderer;
        this.initComponents()
        this.setHandler()
    }minimizeWindow

    initComponents(){
        this.minimizeWindow = document.getElementById('window-minimize')
        this.maximizeWindow = document.getElementById('window-maximize')
        this.unmaximizeWindow = document.getElementById('window-unmaximize')
        this.closeWindow = document.getElementById('window-close')
    }

    setHandler() {
        this.minimizeWindow.addEventListener('click', this.controlHandler.bind(this), false)
        this.maximizeWindow.addEventListener('click', this.controlHandler.bind(this), false)
        this.unmaximizeWindow.addEventListener('click', this.controlHandler.bind(this), false)
        this.closeWindow.addEventListener('click', this.controlHandler.bind(this), false)

        this.ipcRenderer.on('window-control', this.handleMaximize.bind(this))
    }

    controlHandler(event) {
        this.ipcRenderer.send("window-control", event.srcElement.id)
    }

    handleMaximize(event, type) {
        switch(type){
            case 'window-maximized': this.maximizeWindow.hidden = true; this.unmaximizeWindow.hidden = false; break;
            case 'window-unmaximized': this.maximizeWindow.hidden = false; this.unmaximizeWindow.hidden = true; break;
        }
    }

}