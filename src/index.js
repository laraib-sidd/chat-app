const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT;
const publiDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publiDirectoryPath));

let count = 0;

io.on("connection", (socket) => {
	console.log("New Web socket connection");
	socket.emit("countUpdated", count);
});

server.listen(port, () => {
	console.log("The server is running on port ", port);
});
