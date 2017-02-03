var ws = new WebSocket("ws://192.168.2.98:8080/");
var cb;
ws.onmessage = function incoming(message) {
  cb && cb(message.data)
};

module.exports = (newCallback) =>{
  cb = newCallback;
};
