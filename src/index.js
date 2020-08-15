const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT;
const publiDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publiDirectoryPath));

io.on("connection", (socket) => {
	socket.emit("message", "Welcome!");
	socket.broadcast.emit("message", "A new user has entered");

	socket.on("sendMessage", (message, callback) => {
		const filter = new Filter();
		console.log(filter.replaceWord(message));
		if (filter.isProfane(message)) {
			return callback("Profanity is not allowed");
		}
		io.emit("message", message);
		callback();
	});
	socket.on("disconnect", () => {
		io.emit("message", "A user has left");
	});
	socket.on("sendLocation", (coords) => {
		io.emit(
			"message",
			`Location: https://google.com/maps?q=${coords["latitude"]},${coords["longitude"]}`
		);
	});
});

server.listen(port, () => {
	console.log("The server is running on port ", port);
});
