const WebSocket = require('ws');

module.exports = (function() {
  let _client = null;
  let _messagehandler = (message) => { console.warn('meesageHandler'); }
  let _refreshHandler = () => { console.warn('refreshHandler not defined'); }
  
  const handlers = {
    open: async () => {
      console.log('connect to server');
      await _refreshHandler();
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
    set handleRefresh(refreshHandler) {
      _refreshHandler = refreshHandler;
    },
    connect,
    get getClient() {
      return _client;
    }
  };
})();

