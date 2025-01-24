const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		minlength: [3, "Username must be at least 3 character long"],
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		minlength: [10, "Email must be at least 10 character long"],
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minLength: [6, "Password must be at least 6 character long"],
	},
	files: {
		type: Array,
		default: [],
	},
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this.id, username: this.username, email: this.email },
		process.env.JWT_STRING
	);
	return token;
};

userSchema.methods.comparePassword = async function (password) {
	const result = await bcrypt.compare(password, this.password);
	return result;
};

userSchema.statics.hashPassword = async function (password) {
	const salt = await bcrypt.genSalt(12);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

const user = mongoose.model("user", userSchema);

module.exports = user;
