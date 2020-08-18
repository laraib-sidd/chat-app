const users = [];
const addUser = ({ id, username, room }) => {
	// Clean the data
	username = username.trim().toLowerCase();
	room = room.trim().toLowerCase();

	// Validate the statement
	if (!username || !room) {
		return {
			error: "Username and room are required",
		};
	}

	// Check for existing User
	const existingUser = users.find((user) => {
		return user.room === room && user.username === username;
	});

	// Validate Username
	if (existingUser) {
		return {
			error: "Username is in use.",
		};
	}

	// Store User
	const user = { id, username, room };
};
const removeUser = () => {};
const getUser = () => {};
const getUsersInRoom = () => {};

module.exports = {
	addUser,
	removeUser,
	getUser,
	getUsersInRoom,
};
