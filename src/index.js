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

io.on("connection", (socket) => {
	socket.emit("message", "Welcome!");
    
    socket.on("sendMessage", (message) => {
		console.log(message);
	});
});

server.listen(port, () => {
	console.log("The server is running on port ", port);
});
