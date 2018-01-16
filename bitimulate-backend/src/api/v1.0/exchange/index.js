const Router = require('koa-router');

const exchange = new Router();

exchange.get('/', (ctx) => {
  ctx.body = 'exchange api';
});

module.exports = exchange;