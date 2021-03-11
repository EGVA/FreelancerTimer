const { app, BrowserWindow } = require('electron')
function createWindow () {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    minHeight: 600,
    minWidth: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  win.loadFile('./src/index.html')
  win.setMenu(null)
}
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})