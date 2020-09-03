const app = require("./src/app");

//const socketIo = require("socket.io");
const http = require("http");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const sio = require("socket.io")(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  },
});

sio.on("connection", () => {
  console.log("Connected!");
});

server.listen(port, () => {
  console.log("Aplicação executando na porta ", port);
});
