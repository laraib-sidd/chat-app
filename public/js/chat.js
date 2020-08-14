const socket = io();
const inp = document.querySelector("input");
const bt = document.querySelector("button");

socket.on("message", (mes) => {
	console.log(mes);
});

document.querySelector("#form-message").addEventListener("submit", (e) => {
	e.preventDefault();

	const inp = document.querySelector("input");
	inp.innerText = "";
	socket.emit("sendMessage", inp.value);
});
