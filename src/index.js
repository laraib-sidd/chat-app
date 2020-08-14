const path = require("path");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT;
const publiDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publiDirectoryPath));

server.listen(port, () => {
	console.log("The server is running on port ", port);
});
