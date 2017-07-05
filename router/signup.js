const renderTemplate = require("./util/renderTemplate");
const express = require("express");
const router = express.Router();


router.get("/signup", function(req, res) {
	renderTemplate(res, "Login", "login");
});

module.exports = router;
