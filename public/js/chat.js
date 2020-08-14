const socket = io();
const h1 = document.querySelector("h1");
const inp = document.querySelector('')
socket.on("message", (mes) => {
	h1.innerText = mes;
});
