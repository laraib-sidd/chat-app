const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
	generateMessage,
	generateLocationMessage,
} = require("./utils/messages");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT;
const publiDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publiDirectoryPath));

io.on("connection", (socket) => {
	socket.on("join", ({ username, room }) => {
		socket.join(room);
		socket.emit("message", generateMessage("Welcome!"));
		socket.broadcast
			.to(room)
			.emit("message", generateMessage(`${username} has joined ${room}`));
	});
	socket.on("sendMessage", (message, callback) => {
		const filter = new Filter();
		if (filter.isProfane(message)) {
			return callback("Profanity is not allowed");
		}
		io.emit("message", generateMessage(message));
		callback();
	});
	socket.on("disconnect", () => {
		io.emit("message", generateMessage("A user has left"));
	});
	socket.on("sendLocation", (coords, callback) => {
		io.emit(
			"locationMessage",
			generateLocationMessage(
				`https://google.com/maps?q=${coords["latitude"]},${coords["longitude"]}`
			)
		);
		callback();
	});
});

server.listen(port, () => {
	console.log("The server is running on port ", port);
});
