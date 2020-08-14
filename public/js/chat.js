const socket = io();

socket.on("message", (mes) => {
	console.log(mes);
});
