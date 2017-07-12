function requireLoggedOut(req, res, next) {
	if (req.user && req.path !== "/logout") {
		res.redirect("/");
	}
	else {
		next();
	}
}

module.exports = requireLoggedOut;
