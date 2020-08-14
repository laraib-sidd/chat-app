const socket = io();
socket.on("countUpdated", (count) => {
	console.log("The count has been updated to ", count);
});

const bt = document.querySelector("button");
bt.addEventListener("click", (e) => {
	count += 1;
});
