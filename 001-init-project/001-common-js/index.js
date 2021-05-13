const {Server} = require('http')
const _ = require('lodash')
const myModule = require('./my-module')

console.log(myModule);

myModule.a = 84;

require('./my-module-2');

const server = new Server((req, res) => {
  res.end("hello")
});

server.listen(3000)

console.log("hello");
