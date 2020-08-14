const socket = io();
const inp = document.querySelector("input");
const bt = document.querySelector("button");

socket.on("welcome", (mes) => {
	console.log(mes);
});
bt.addEventListener("click", () => {
	const mes = inp.value;
	socket.emit("sendMessage", mes);
});
