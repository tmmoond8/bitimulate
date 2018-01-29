require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const api = require('./api');
const db = require('./db');
const jwtMiddleware = require('lib/middlewares/jwt');

db.connect();
// load environment variables
const {
  PORT: port
} = process.env;

const router = new Router();
router.use('/api', api.routes());
app.use(jwtMiddleware);
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(ctx => {
  ctx.body = 'hello bitimulate';
});

app.listen(port, () => {
  console.log(`bitimulate server is listening to port ${port}`);
});
