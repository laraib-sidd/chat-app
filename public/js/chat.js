const socket = io();
const h1 = document.querySelector("h1");
const inp = document.querySelector("input");
const bt = document.querySelector("button");

bt.addEventListener("click", () => {
	const mes = inp.value;
	console.log("bt", mes);
	socket.emit("message", mes);
});

socket.on("welcome", (mes) => {
	console.log(mes);
});
