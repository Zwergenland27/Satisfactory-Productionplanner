const { app, BrowserWindow, globalShortcut } = require('electron')
const Titlebar = require("../frontend/scripts/titlebar")

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

  //var menu = Menu.buildFromTemplate(menuTemplate);
  //Menu.setApplicationMenu(menu)

  Titlebar.initialize(win)

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