const socket = io();
socket.on("countUpdated", (count) => {
	console.log("The count has been updated to ", count);
});

const bt = document.querySelector("#increment");
bt.addEventListener("click", (e) => {
	socket.emit("increment");
});
