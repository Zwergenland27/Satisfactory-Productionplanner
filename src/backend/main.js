const { app, BrowserWindow, Menu, globalShortcut, ipcMain } = require('electron')
const { menuTemplate } = require("../frontend/scripts/menu")

const path = require('path')
const frontend = "./src/frontend"

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

  //TODO: self implement modern toolbar OR pull request to current module for changing style
  var menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu)

  createTitlebar(win)

  win.loadFile(path.join(frontend, 'index.html'))

  win.webContents.openDevTools()

  globalShortcut.register('f5', () => {
    win.reload();
  })
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
    globalShortcut.unregisterAll()
  }
})

function createTitlebar(window) {
  window.on('unmaximize', () => {
    window.webContents.send('window-control', 'window-unmaximized')
  })
  window.on('maximize', () => {
    window.webContents.send('window-control', 'window-maximized')
  })
  ipcMain.on('window-control', (event, type) => {
    switch(type){
      case 'window-minimize': window.minimize(); break;
      case 'window-maximize': window.maximize(); break;
      case 'window-unmaximize': window.restore(); break;
      case 'window-close': window.close(); break;
    }
  })
}