const socket = io();
// elements
const $messageForm = document.querySelector("#form-message");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");

socket.on("message", (mes) => {
	console.log(mes);
});

$messageForm.addEventListener("submit", (e) => {
	e.preventDefault();

	// disabelForm
	$messageFormButton.setAttribute("disabled", "disabled");

	const message = $messageFormInput.value;
	socket.emit("sendMessage", message, (error) => {
		$messageFormButton.removeAttribute("disabled");
		$messageFormInput.value = "";
		$messageFormInput.focus();

		if (error) {
			return console.log(error);
		}
		console.log("Message Delivered!");
	});
});

$sendLocationButton.addEventListener("click", () => {
	$sendLocationButton.setAttribute("disabled", "disabled");
	if (!navigator.geolocation) {
		alert("Geolocation is not supported by your browser");
	}
	navigator.geolocation.getCurrentPosition((position, error) => {
		if (error) {
			console.log(err);
		}
		socket.emit(
			"sendLocation",
			{
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			},
			() => {
				$sendLocationButton.removeAttribute("disabled");
				console.log("Location Shared");
			}
		);
	});
});
