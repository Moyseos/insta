function requireLoggedIn(req, res, next) {
	if (req.user) {
		next();
	}
	else {
		res.redirect("/home");
	}
}

module.exports = requireLoggedIn;
