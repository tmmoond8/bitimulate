
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
  low24hr: Types.Double,
  lastUpdate: {
    type: Date,
    default: new Date()
  }
});

// only for temporary
ExchangeRate.statics.drop = function () {
  return this.remove({}).exec();
}

ExchangeRate.index({name: 1}, {name: 'rateTypeIdentifier', unique: true});

ExchangeRate.statics.updateTicker = function(name, data) {
  return this.findOneAndUpdate({name}, {data, lastUpdate: new Date()}, { upsert: false, new: true}).exec();
};

module.exports = mongoose.model('ExchangeRate', ExchangeRate);