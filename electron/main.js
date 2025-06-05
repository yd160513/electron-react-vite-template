const { app, BrowserWindow } = require('electron')
const path = require('path')
const ipcMainHandler = require('./ipcMainHandler')

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    ipcMainHandler.handler('test-invoke', (_, args) => {
        console.log('Received test-invoke:', args)
        return 'Hello from main process'
    })

    ipcMainHandler.on('test-send', (_, args) => {
        console.log('Received test-send:', args)

        ipcMainHandler.send(win, 'test-on', {a: 'test-on'})
    })

    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:5173')
        win.webContents.openDevTools()
    } else {
        win.loadFile(path.join(__dirname, '../dist/index.html'))
    }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})