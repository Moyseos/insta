function requireLoggedOut(req, res, next) {
	if (req.user && req.path !== "/logout") {
		res.redirect("/docs");
	}
	else {
		next();
	}
}

module.exports = requireLoggedOut;
