const express = require("express");
const router = express.Router();

const userModel = require("../models/user.model");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

router.get("", (req, res) => {
	res.render("index");
});

router.get("/register", (req, res) => {
	res.render("register");
});

router.post(
	"/register",
	body("username").trim().isLength({ min: 3 }),
	body("email").trim().notEmpty().isEmail(),
	body("password").trim().isLength({ min: 6 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: "Invalid data",
			});
		}
		const { email, username, password } = req.body;

		// Check if username already exists
		const existingUser = await userModel.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: "Username already exists" });
		}

		if (!email || !username || !password) {
			return res.status(400).json({ message: "Please fill all fields" });
		}

		// Check if email already exists
		const existingEmail = await userModel.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ message: "Email already exists" });
		}

		const hashedPassword = await userModel.hashPassword(password);

		const user = await userModel.create({
			username,
			email,
			password: hashedPassword,
		});

		const token = user.generateAuthToken();

		res.cookie("token", token);

		// res.send({ user, token });
		res.redirect("/user/login")
	}
);

router.get("/login", (req, res) => {
	res.render("login");
});

router.post(
	"/login",
	body("email").trim().notEmpty().isEmail(),
	body("password").trim().isLength({ min: 6 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: "Invalid data",
			});
		}
		const { email, username, password } = req.body;
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(401).send("Invalid email or password");
		}

		const result = await user.comparePassword(password);
		if (!result) {
			return res.status(401).send("Invalid email or password");
		}

		const token = user.generateAuthToken();
		res.cookie("token", token);
		// res.send({ user, token });
		res.redirect("/home");
	}
);

router.post("/logout", (req, res) => {
	res.clearCookie("token");
	res.redirect("/user/login");
})

module.exports = router;
