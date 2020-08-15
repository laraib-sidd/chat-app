const socket = io();

socket.on("message", (mes) => {
	console.log(mes);
});

document.querySelector("#form-message").addEventListener("submit", (e) => {
	e.preventDefault();

	const message = e.target.elements.message.value;
	socket.emit("sendMessage", message, (error) => {
		if (error) {
			return console.log(error);
		}
	});
});

document.querySelector("#send-location").addEventListener("click", () => {
	if (!navigator.geolocation) {
		alert("Geolocation is not supported by your browser");
	}
	navigator.geolocation.getCurrentPosition((position, error) => {
		if (error) {
			console.log(err);
		}
		socket.emit("sendLocation", {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		});
	});
});
