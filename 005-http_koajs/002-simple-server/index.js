const fs = require('fs');
const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
  // Request =================================================
  // ctx.req -> http.IncomingMessage
  // ctx.request -> koa.Request

  console.log('url: ', ctx.request.URL); // = {}
  console.log('query: ', ctx.request.querystring); // = param=value
  console.log('path: ', ctx.request.path); // = /path
  console.log('query params', ctx.request.query); // { param:"value" }
  console.log('method: ', ctx.request.method); // GET
  console.log('headers: ', ctx.request.headers, ctx.headers); //ctx.header
  console.log('headers: ', ctx.request.get('user-agent'));

  // Aliases: https://github.com/koajs/koa/blob/master/docs/api/context.md#request-aliases
  // ctx.request.headers => ctx.headers
  // ctx.request.method => ctx.method
  // ctx.request.querystring => ctx.querystring
  // ctx.request.get => ctx.get

  // Response =================================================
  // ctx.res -> http.ServerResponse
  // ctx.response -> koa.Response

  // ctx.response.status = 200;

  // ctx.response.body = 'Hello world';
  // ctx.response.body = Buffer.from('buffer');
  // ctx.response.body = {
  //   foo: 'bar',
  // };
  // ctx.response.body = fs.createReadStream('./package.json');

  // ctx.response.set('content-type', 'application/json');

  // ctx.response.redirect('https://google.com')

  // Aliases: https://github.com/koajs/koa/blob/master/docs/api/context.md#response-aliases
  // ctx.response.body => ctx.body
  // ctx.response.status => ctx.status
  // ctx.response.set => ctx.set


  // ctx.throw(400, 'Bad request', {resource: 'user'});
  const value = ctx.cookies.get('my-cookie2');
  console.log(value);
  ctx.cookies.set('my-cookie2', 'test', {signed: false, http: true/*, secure: true*/});
});


app.listen(3000, (err) => {
  console.log('Server started');
});
