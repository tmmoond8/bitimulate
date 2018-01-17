
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const { Schema } = mongoose;
const { Types } = Schema;
// Current rate for crypto currency exchange

const ExchangeRate = new Schema({
  name: String,
  last: Types.Double,
  lowestAsk: Types.Double,
  highestBid: Types.Double,
  percentChange: Types.Double,
  baseVolume: Types.Double,
  quoteVolume: Types.Double,
  isFrozen: Types.Double,
  high24hr: Types.Double,
  low24hr: Types.Double
});

module.exports = mongoose.model('ExchangeRate', ExchangeRate);