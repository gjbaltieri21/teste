const { app, BrowserWindow } = require('electron')
const server = require('./src/app')

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({

    })
    mainWindow.loadFile('./src/index.html')
    mainWindow.loadURL('localhost:8000/update')
    server()
})