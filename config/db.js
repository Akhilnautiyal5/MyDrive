const mongoose = require("mongoose");

function connectToDB() {
	const connectionString = process.env.CONNECTION_STRING;
	if (!connectionString) {
		console.error(
			"CONNECTION_STRING is not defined in the environment variables."
		);
		process.exit(1);
	}

	mongoose
		.connect(connectionString)
		.then(() => {
			console.log("Connected to DB");
		})
		.catch((err) => {
			console.error("Error connecting to the database:", err);
		});
}

module.exports = connectToDB;
