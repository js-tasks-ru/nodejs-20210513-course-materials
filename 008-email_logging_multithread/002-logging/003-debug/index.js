const Koa = require('koa');
const Router = require('@koa/router')
const app = new Koa();
const debug = require('debug')('app');

const router = new Router({})
router.get('/one',
  // validation
  // sanitizing
  // business-logic
  (ctx, next) => {
    ctx.body = 1;
    return next()
  },
  (ctx) => {
    ctx.body += 1
    ctx.status = 200
  },
)
router.get('/two', ctx => ctx.body = 1)

function middleware(ctx, next) {
  debug('new request');
  return next()
}

app.use(middleware);
app.use(router.middleware())


app.listen(3000);
