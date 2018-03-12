require('dotenv').config();

const poloniex = require('../lib/poloniex');
const db = require('db');
const ExchangeRate = require('db/models/ExchangeRate');
const ChartData = require('db/models/ChartData');
const socket = require('./socket');
const { parseJSON, polyfill } = require('../lib/common');
const { currencyPairMap } = require('lib/poloniex/currencyPairMap');
const Progress = require('cli-progress');
const that = this;

const initialize = async (registerInitialExchangeRate) => {
  db.connect();
  const itemCount = await ExchangeRate.getCount();
  if (itemCount < 10) {
    registerInitialExchangeRate();
  }
  await ChartData.drop();
  console.log('loading chart data since 2015...');
  await importData();
  const current = (new Date()) / 1000;

  console.log('loading chart data a month short term...');
  await importData(300, current - 60 * 60 * 24 * 30);

  console.log('loading chart data few minute short term...');
  await importData(300, (new Date()) / 1000);
  socket.connect();
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

async function importData(period, start) {
  const bar = new Progress.Bar({}, Progress.Presets.shades_classic);
  const currencyPairs = [];
  let current = 0;
  for (let key in currencyPairMap) {
    currencyPairs.push(currencyPairMap[key]);
  }

  bar.start(currencyPairs.lenght, 0);
  bar.update(0);
  const requests = currencyPairs.map((currencyPair) => () => poloniex.getChartData(currencyPair, period, start).then(
    (data) => ChartData.massImport(currencyPair, data)
  ));

  for(let i = 0; i < Math.ceil(currencyPairs.length / 6); i++) {
    const promises = requests.slice(i * 6, i * 6 + 6).map(thunk => thunk());
    try {
      await Promise.all(promises);
      current += promises.length;
      bar.update(current);
    } catch(e) {
      console.log('error!');
    }
  }
  bar.stop();
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
    if (!data) return;
    const converted = poloniex.convertToTickerObject(data);
    const { name } = converted;
    const rest = polyfill.objectWithoutProperties(converted, 'name');
    
    try {
      const updated = await ExchangeRate.updateTicker(name, rest);
      console.log('[Update]', name, new Date());
    } catch (e) {
      console.error(e);
    }
    console.log('-------------------------------------------');
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
// socket.handleRefresh = () => null;
socket.handleRefresh = () => updateEntireRate();

initialize(registerInitialExchangeRate);