const Koa = require('koa');

// since v15
const {setTimeout} = require('timers/promises')

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    // handle error
  }
})

// GET / 100ms
app.use(async (ctx, next) => {
  const start = process.hrtime.bigint();

  await next()

  const end = process.hrtime.bigint();
  const delta = (end - start) / BigInt(1000 * 1000)
  console.log(`${ctx.method} ${ctx.path} ${delta}ms`)
})

app.use(async (ctx, next) => {
  await setTimeout(200)
  ctx.body = "Hello";
});

app.listen(3000, () => {
  console.log('Server started');
});

/**
 * Req -> M1 -> M2 -> M3(Res) -> M2 -> M1 -> Response
 */
