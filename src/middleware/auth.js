const User = require("../models/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.replace("Bearer ", "");
		const decoded = await jwt.verify(token, "mysecretkey");
		const user = await User.findOne({
			_id: decoded._id,
			"tokens.token": token
		});
		if (!user) throw new Error();
		req.user = user;
		req.token = token;
		next();
	} catch (error) {
		res.status(401).send(error);
	}
};

module.exports = auth;
