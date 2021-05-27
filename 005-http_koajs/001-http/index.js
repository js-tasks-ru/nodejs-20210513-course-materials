const {Server} = require('http');

const server = new Server(/* (req, res) => {...} */);

/**
 * @type {module:http.Server}
 * req {http.IncomingMessage} - https://nodejs.org/dist/latest-v16.x/docs/api/http.html#http_class_http_incomingmessage
 * res {http.ServerResponse} - https://nodejs.org/dist/latest-v16.x/docs/api/http.html#http_class_http_serverresponse
 */
server.on('request', async (req, res) => {

  console.log(`============Request===========`);

  console.log(`${req.method} ${req.url} ${req.httpVersion}`);
  console.log(JSON.stringify(req.headers, null, 2));
  console.log();

  // req.on('data', (chunk) => {
  // })
  const body = [];
  for await (const chunk of req) {
    body.push(chunk)
  }
  console.log(JSON.parse(Buffer.concat(body).toString()));

  // req.pipe(res)

  // req.on('aborted', () => {})

  console.log();
  console.log(`============Response===========`);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  console.log('Response headers: ', JSON.stringify(res.getHeaders(), null, 2));
  // res.getHeader / getHeaders / getHeaderNames / hasHeader
  // res.removeHeader

  // response.headersSent // true/false
  console.log(`Response headers sent: `, res.headersSent);


  // res.statusCode = 201
  // res.statusMessage = "Hello"
  res.writeHead(203, 'OK', /*{
    'content-type': 'text/plain; charset=utf-8'
  }*/)

  console.log(`Response headers sent: `, res.headersSent);

  res.write(JSON.stringify({"hello": "world"})) // string/Buffer
  res.end(/* body */);
});

server.once('listening', err => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  const {port, address} = server.address();
  console.log(`Server started on ${address}:${port}`);
});

server.listen(3000, 'localhost', /*err => {} */);
