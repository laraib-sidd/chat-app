const socket = io();
const h1 = document.querySelector("h1");
const inp = document.querySelector("input");
const bt = document.querySelector("button");

bt.addEventListener("click", () => {
	console.log(inp.value);
});

socket.on("message", (mes) => {
	h1.innerText = mes;
});
