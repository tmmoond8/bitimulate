const currencyPairMap = require('./currencyPairMap');
const axios = require('axios');


module.exports = (function () {
  function getCurrentPairName(id) {
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
      'id',
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
    // const obj = {};
    // data.forEach((value, i) => {
    //   const key = keys[i];
    //   obj[key] = value;
    // });
    data.forEach((value, i) => {
      if ( i === 0 ) {
        obj.name = getCurrentPairName(value)
        return;
      }
      const key = keys[i];
      obj[key] = value;
    })
    

    return obj;
  }



  return {
    getCurrentPairName,
    getTickers,
    convertToTickerObject
  }
})();
