const User = require("../models/user");
const jwt = require("jsonwebtoken");
const express = require("express");
const auth = require("../middleware/auth");

const userRouter = express.Router();

//Get all user
userRouter.get("/users", (req, res) => {
	try {
		User.find({})
			.then((users) => {
				res.send(users);
			})
			.catch((e) => {
				res.send(e);
			});
	} catch (error) {
		res.status(500).send(error);
	}
});

userRouter.get("/users/byname", async (req, res) => {
	try {
		if (!req.query.name) throw new Error();
		let fNameMatch = await User.find({
			firstname: new RegExp(req.query.name, "i")
		});
		let lNameMatch = await User.find({
			lastname: new RegExp(req.query.name, "i")
		});
		let matched = fNameMatch.concat(lNameMatch);
		res.send(matched);
	} catch (error) {
		res.status(401).send();
	}
});

userRouter.get("/users/byempid", async (req, res) => {
	try {
		if (!req.query.id) throw new Error();
		const user = await User.findOne({ id: parseInt(req.query.id) });
		if (!user) {
			throw new Error();
		}
		res.send(user);
	} catch (error) {
		res.status(500).send("User not found!");
	}
});

//Logged in user profile
userRouter.get("/users/me", auth, (req, res) => {
	try {
		res.send(req.user);
	} catch (error) {
		res.status(500).send(error);
	}
});

//Create usersa aka signup
userRouter.post("/users", async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		const token = await user.getAuthToken();
		res.status(201).send({ user, token });
	} catch (error) {
		res.status(500).send(error);
	}
});

userRouter.post("/users/loginVerification", (req, res) => {
	User.findOne({ id: req.body.empId })
		.then((user) => {
			if (!user) return res.redirect("signUp");
			return res.redirect("applyLeave");
		})
		.catch((e) => {
			console.log(e);
		});
});

//Login
userRouter.post("/users/login", async (req, res) => {
	try {
		const user = await User.findUserByEmpId(req.body.id);
		const token = await user.getAuthToken();
		res.send({ user });
	} catch (error) {
		res.status(500).send(error);
	}
});

//Logout
userRouter.post("/users/logout", auth, async (req, res) => {
	try {
		const user = req.user;
		user.tokens = [];
		await user.save();
		res.send();
	} catch (error) {
		res.status(500);
		console.log(error);
	}
});

module.exports = userRouter;
