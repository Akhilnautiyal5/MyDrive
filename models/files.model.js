const mongoose = require('mongoose');
const { ID } = require('node-appwrite');

const fileSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "name is required"],
	},
	$id: {
		type: String,
		default: ID.unique(),
		required: [true, "ID is required"],
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: [true, "User is required"],
	},
	sizeOriginal: {
		type: Number,
		required: [true, "Original size is required"],
	},
	mimeType: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const file = mongoose.model('file', fileSchema);

module.exports = file;