const socket = io();

socket.on("message", (mes) => {
	console.log(mes);
});

document.querySelector("#form-message").addEventListener("submit", (e) => {
	e.preventDefault();

	const message = e.target.elements.message.value;
	socket.emit("sendMessage", message);
});

document.querySelector("#send-location").addEventListener("click", () => {
	console.log(navigator.geolocation);
});
