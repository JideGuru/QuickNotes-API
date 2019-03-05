const http = require("http");
const port = process.env.SERVER_PORT || 3000;
const app = require('./app');
const server = http.createServer(app);


server.listen(port);