var storage = require('../user/settings');

const windowStateSetting = 'lastWindowState';

exports.saveState = function (browserWindow) {
    var bounds = browserWindow.getBounds();
    var lastState = {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        visible: browserWindow.isVisible()
    };
    storage.set(windowStateSetting, lastState);
};

exports.getLastState = function () {
    var lastState = storage.get(windowStateSetting);
    return lastState;
};