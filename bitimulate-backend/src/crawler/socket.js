const WebSocket = require('ws');

module.exports = (function() {
  let _client = null;
  let _messagehandler = (message) => {
    console.warn('meesageHandler');
  }
  
  const handlers = {
    open: () => {
      console.log('connect to server');
      _client.send(`{"command": "subscribe", "channel": 1002}`);
    },
    message: (message) => {
      _messagehandler(message);
    }
  };
  const connect = () => {
    _client = new WebSocket('wss://api2.poloniex.com');
    _client.on('open', handlers.open);
    _client.on('message', handlers.message);
    _client.on('close', reconnect);
  };

  const reconnect = () => {
    console.log('reconnecting... ');
    setTimeout(connect, 100);
  };

  return {
    set handleMessage(messageHandler) {
      _messagehandler = messageHandler;
    },
    connect,
    get getClient() {
      return _client;
    }
  };
})();

