import { app, BrowserWindow, globalShortcut } from "electron"
import { Titlebar } from "../frontend/scripts/titlebar"

const path = require('path')
const frontend = "./src/frontend"

function createWindow () {
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

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