const { currencyPairMap, maxCurrencyId  } = require('./currencyPairMap');
const axios = require('axios');

module.exports = (function () {
  function getCurrentPairName(id) {
    if (parseInt(maxCurrencyId) > 200) {
      return 'NULL_NULL';
    }
    return currencyPairMap[id].toString();
  }
  function getTickers() {
    return axios.get('https://poloniex.com/public?command=returnTicker').then(
     response => response.data
    );
  }
  
  const obj = {};
  function convertToTickerObject(data) {
    const keys = [
      'name',
      'last',
      'lowestAsk',
      'highestBid',
      'percentChange',
      'baseVolume',
      'quoteVolume',
      'isFrozen',
      'high24hr',
      'low24hr'
    ];
    data[0] = getCurrentPairName(data[0]);
    data.forEach((value, i) => {
      obj[keys[i]] = value;
    });

    return obj;
  }
  
  return {
    getCurrentPairName,
    getTickers,
    convertToTickerObject
  }
})();
