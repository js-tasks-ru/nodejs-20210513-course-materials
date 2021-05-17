const {Server} = require('http');

const server = new Server();

const a = [];

server.on('request', (req, res) => {
  a.push(Array.from({length: 1e6}, () => 0))
  res.end();
});

server.on("listening", () => {
  console.log('Server started')
});

server.listen(3000);
