const Router = require('koa-router');
const auth = require('./auth');
const exchange = require('./exchange');
const wallet = require('./wallet');

const v10 = new Router();

v10.use('/auth', auth.routes());
v10.use('/exchange', exchange.routes());
v10.use('/wallet', wallet.routes());

module.exports = v10;