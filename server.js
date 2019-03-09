//Create the Server!

const http = require("http");
//Insert PORT here or define in nodemon.json
const port = process.env.SERVER_PORT || 3000;
const app = require('./app');
const server = http.createServer(app);


server.listen(port);