const {Server} = require('http');

const server = new Server();

server.on('request', async (req /*http.IncomingMessage*/, res /*http.ServerResponse*/) => {
  // req implements Readable
  // res implements Writable

  const body = [];
  for await (let chunk of req) {
    body.push(chunk)
  }
  console.log(JSON.parse(Buffer.concat(body).toString()));
  //
  // res.write("Hello");
  // res.end();

  req.pipe(res)

});

server.listen(3000);
