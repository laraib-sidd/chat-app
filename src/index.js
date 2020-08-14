const path = require("path");
const express = require("express");

const app = express();

const port = process.env.PORT;
const publiDirectoryPath = path.join(__dirname,"../public");

app.use(express.static(publiDirectoryPath));

app.listen(port, () => {
	console.log("The server is running on port ", port);
});
