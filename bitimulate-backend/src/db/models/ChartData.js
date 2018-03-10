const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const { Schema } = mongoose;
const { Types: { Double } } = Schema;

const ChartData = new Schema({
  name: String,
  date: String,
  high: Double,
  low: Double,
  open: Double,
  close: Double,
  volume: Double,
  quoteVolume: Double,
  weightedAverage: Double
});

ChartData.statics.massImport = function(data) {
  const converted = data.map(data => data.date ** 1000);
  return this.create(converted);
}

module.exports = mongoose.model('ChartData', ChartData);