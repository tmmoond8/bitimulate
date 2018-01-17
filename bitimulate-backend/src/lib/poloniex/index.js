const currencyPairMap = require('./currencyPairMap');
const axios = require('axios');


module.exports = {
  getCurrencyPairName(id) {
    return currencyPairMap[id.toString()];
  },
  getTickers () {
    return axios.get('https://poloniex.com/public?command=returnTicker').then(
     response => response.data
    );
  }
};