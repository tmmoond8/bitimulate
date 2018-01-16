require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const api = require('./api');

// load environment variables
const {
  PORT: port
} = process.env;

const router = new Router();
router.use('/api', api.routes());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(ctx => {
  ctx.body = 'hello bitimulate';
});

app.listen(port, () => {
  console.log(`hurm server is listening to port ${port}`);
});
