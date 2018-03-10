require('dotenv').config();

const poloniex = require('../lib/poloniex');
const db = require('db');
const ExchangeRate = require('db/models/ExchangeRate');
const ChartData = require('db/models/chartData');
const socket = require('./socket');
const { parseJSON, polyfill } = require('../lib/common');
const { currencyPairMap } = require('lib/poloniex/currencyPairMap');

const initialize = async() => {
  db.connect();
  socket.connect();
  await importInitialCharData();
}

async function importInitialCharData() {
  const currencyPairs = [];
  for (let key in currencyPairMap) {
    currencyPairs.push(currencyPairMap[key]);
  }

  const requests = currencyPairs.map((currencyPairs) => () => poloniex.getChartData(currencyPairs))

  for (let i = 0; i < Math.ceil(currencyPairs.length / 10); i++) {
    const promises = requests.slice(i * 10, i * 10 + 10).map(thunk => thunk());
    console.log(`${i * 10} ~ ${i * 10 + 10} start`);
    console.log(currencyPairs.slice(i * 10, i * 10 + 10).join(', '));
    try {
      await Promise.all(promises);
    } catch(e) {
      console.log('error!');
      return;
    }
  }
  console.log(`${currencyPairs.length} items updated`);
}

async function registerInitialExchangeRate() {
  const tickers = await poloniex.getTickers();

  // removes all the data from the collection (only for temporary use);
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

  try {
    await Promise.all(promises);
  } catch (e) {
    console.log(e);
  }
}

async function updateEntireRate() {
  const tickers = await poloniex.getTickers();
  const keys = Object.keys(tickers);

  const promises = keys.map(
    key => {
      return ExchangeRate.updateTicker(key, tickers[key]);
    }
  );

  try {
    await Promise.all(promises);
  } catch (e) {
    console.error('Oops, failed to update entire rate !');
    return;
  }
  console.log('Updated entire rate.');
}

const messageHandler = {
  1002: async (data) => {
    // if (!data) return;
    // const converted = poloniex.convertToTickerObject(data);
    // const { name } = converted;
    // const rest = polyfill.objectWithoutProperties(converted, 'name');
    
    // try {
    //   const updated = await ExchangeRate.updateTicker(name, rest);
    //   console.log('[Update]', name, new Date());
    // } catch (e) {
    //   console.error(e);
    // }
    // console.log('-------------------------------------------');
  }
}

socket.handleMessage = (message) => {
  const parsed = parseJSON(message);
  if (!parsed) {
    return null;
  }
  const [type, meta, data] = parsed;
  if (messageHandler[type]) {
    messageHandler[type](data);
  }
}
// registerInitialExchangeRate();
socket.handleRefresh = updateEntireRate;

initialize();