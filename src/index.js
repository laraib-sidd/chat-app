const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const Filter = require("bad-words");
const {
	generateMessage,
	generateLocationMessage,
} = require("./utils/messages");
const {
	addUser,
	removeUser,
	getUser,
	getUsersInRoom,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT;
const publiDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publiDirectoryPath));

io.on("connection", (socket) => {
	socket.on("join", ({ username, room }, callback) => {
		socket.join(room);
		const { error, user } = addUser({ id: socket.id, username, room });

		if (error) {
			return callback(error);
		}

		socket.join(user.room);
		socket.emit("message", generateMessage("Welcome!"));
		socket.broadcast
			.to(user.room)
			.emit(
				"message",
				generateMessage(`${user.username} has joined ${user.room}`)
			);
		callback();
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
		const user = removeUser(socket.id);
		if (user) {
			io.emit("message", generateMessage(`${user.username} has left`));
		}
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
