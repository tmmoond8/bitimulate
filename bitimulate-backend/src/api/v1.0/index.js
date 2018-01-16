const Router = require('koa-router');
const auth = require('./auth');
const exchange = require('./exchange');

const v10 = new Router();

v10.use('/auth', auth.routes());
v10.use('/exchange', exchange.routes());

module.exports = v10;