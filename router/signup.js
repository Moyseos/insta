const express = require("express");
const router = express.Router();


router.get("/signup", function(req, res) {
	res.render("template", {
		page: "signup",
		pageArg: null,
	});
});

module.exports = router;
