var Tray = require('tray');
var Menu = require('menu');
var path = require('path');

var iconPath = path.join(__dirname, '../assets/pendrive016.png');
var appIcon = null;
var win = null;

exports.init = function(trayIconHandlers) {
  appIcon = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open DevTools',
      accelerator: 'Alt+CommandOrControl+I',
      click: function() {
          trayIconHandlers.showDevTools();
      }
    },
    { label: 'Quit',
      accelerator: 'CommandOrControl+Q',
      click: function() {
          trayIconHandlers.terminate();
      }
    },
    // {
    //   label: 'Item1',
    //   type: 'radio',
    //   icon: iconPath
    // },
    // {
    //   label: 'Item2',
    //   submenu: [
    //     { label: 'submenu1' },
    //     { label: 'submenu2' }
    //   ]
    // },
    // {
    //   label: 'Item3',
    //   type: 'radio',
    //   checked: true
    // }
  ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);
  appIcon.on('click', trayIconHandlers.showWindow);
  appIcon.on('double-click', trayIconHandlers.showWindow);
}

exports.destroy = function() {
    appIcon.destroy();
}