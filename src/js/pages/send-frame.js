// Establish websocket connection to API for button events
var config = require('../config');
var ws = new WebSocket(config.ws);

module.exports = (frame) => {
    ws.send(JSON.stringify(frame));
};