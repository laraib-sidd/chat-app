const socket = io();
const h1 = document.querySelector("h1");
socket.on("message", (mes) => {
	h1.innerText = mes;
});
