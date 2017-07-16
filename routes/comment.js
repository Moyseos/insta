const express = require("express");
const User = require("../models/user");
const File = require("../models/file");
const Comments = require("../models/comments");
const renderTemplate = require("../util/renderTemplate");
const requireLoggedIn = require("../middleware/requireLoggedIn");

const router = express.Router();





router.post("/photo/:fileId/comment",requireLoggedIn, function(req, res) {
	console.log(req.params);
	Comments.create({
		comment: req.body.comment,
		fileId: req.params.fileId,
	}).then (function(comment, pics) {
		if (comment) {
			renderTemplate(req, res, "home", {
				username: req.user.get("username"),
				pics: pics,
				comment: comment,
			});
		}
		else {
			renderTemplate(req, res, "home", {
				error: "Enter a comment",
			});
		}
	})
	.catch(function(err) {
		res.status(500).send("Something went wrong with your comment!");
	});
});


module.exports = router;
