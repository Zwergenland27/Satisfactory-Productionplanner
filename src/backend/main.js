const { app, BrowserWindow, Menu } = require('electron')
const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main")
const { menuTemplate } = require("../frontend/menu")

const path = require('path')
const frontend = "./src/frontend"

setupTitlebar();

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  attachTitlebarToWindow(win)

  //TODO: self implement modern toolbar OR pull request to current module for changing style
  var menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu)

  win.loadFile(path.join(frontend, 'index.html'))

  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})