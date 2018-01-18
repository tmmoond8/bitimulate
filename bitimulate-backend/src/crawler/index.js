require('dotenv').config();

const poloniex = require('../lib/poloniex');
const db = require('db');
const ExchangeRate = require('db/model/ExchangeRate');
const socket = require('./socket');
const { parseJSON, polyfill } = require('../lib/common');

db.connect();
socket.connect();

const messageHandler = {
  1002: async (data) => {
    if (!data) return;
    const converted = poloniex.convertToTickerObject(data);
    const { name } = converted;
    const rest = polyfill.objectWithoutProperties(converted, 'name');
    
    try {
      // console.log(name, rest);
      const updated = await ExchangeRate.updateTicker(name, rest);
      console.log(updated);
    } catch (e) {
      console.error(e);
    }
    console.log('-------------------------------------------');
  }
}

socket.handleMessage = (message) => {
  // console.log(message);
  const parsed = parseJSON(message);
  if (!parsed) {
    return null;
  }
  const [type, meta, data] = parsed;
  if (messageHandler[type]) {
    messageHandler[type](data);
  }
}

async function registerInitialExchangeRate() {
  const tickers = await poloniex.getTickers();
  await ExchangeRate.drop();
  const keys = Object.keys(tickers);
  const promises = keys.map(
    key => {
      const ticker = tickers[key];
      const data = Object.assign({name: key}, ticker);
      const exchangeRate = new ExchangeRate(data);
      return exchangeRate.save();
    }
  );

  // try {
  //   await Promise.all(promises);
  // } catch (e) {
  //   console.log(e);
  // }
}


registerInitialExchangeRate();