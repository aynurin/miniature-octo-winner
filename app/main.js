/// <reference path="../typings/tsd.d.ts" />

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const DEBUG = true;
const window = require('./env/window');

// Report crashes to our server.
electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
    var windowOptions = {
        width: 400,
        height: 600,
        frame: false,
        resizable: false,
        skipTaskbar: true,
        title: 'Portal',
        // see https://github.com/atom/electron/blob/c7d9352972ff5c90733a3ce0eb3add86fd101905/docs/api/frameless-window.md#limitations
        // but not working on my machine (tried '--disable-gpu' too)
        // transparent: true
    };

    var lastState = window.getLastState();
    if (lastState != null) {
        windowOptions = Object.assign(windowOptions, lastState);
    }
    
    // Create the browser window.
    mainWindow = new BrowserWindow(windowOptions);

    if (DEBUG) {
        // Open the DevTools.
        mainWindow.webContents.openDevTools({ detach: true });
    }

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/ui/index.html');

    mainWindow.on('close', function () {
        window.saveState(mainWindow);
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});