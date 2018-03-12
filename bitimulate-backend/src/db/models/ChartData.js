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

ChartData.statics.drop = function() {
  return this.remove();
}

ChartData.statics.massImport = function(name, data) {
  // console.log(data);
  if(data[0].open === 0) {
    return;
  }
  const converted = data.map(data => Object.assign({}, data, {
    date: data.date * 1000,
    name
  }));
  return this.create(converted);
}

module.exports = mongoose.model('ChartData', ChartData);