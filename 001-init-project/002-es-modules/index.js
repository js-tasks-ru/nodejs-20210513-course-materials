import {Server} from "http"

const server = new Server((req, res) => {
  res.end("hello")
});

await Promise.resolve()

server.listen(3000)
