const express = require("express");
const multer = require("multer");

const Comments = require("../models/comments");
const User = require("../models/user");
const File = require("../models/file");
const renderTemplate = require("../util/renderTemplate");
const requireLoggedIn = require("../middleware/requireLoggedIn");

const uploader = multer({ dest: "uploads/" });
const router = express.Router();


// Render all of a user's documents
router.get("/home",requireLoggedIn, function(req, res) {
	let message = "";

	if (req.query.success) {
		message = "File uploaded succesfully!";
	}

	req.user.getFiles({ include: [Comments] }).then(function(pics) {
		renderTemplate(req, res, "My Documents", "home", {
			username: req.user.get("username"),
			pics: pics,
			description: req.body.description,
		});
	});
});



// Render an upload form that POSTs to /docs/upload
router.get("/profile", requireLoggedIn, function(req, res) {
	renderTemplate(req, res, "Upload a File", "profile");
});

// Upload the form at GET /docs/upload
router.post("/home", requireLoggedIn, uploader.single("file"), function(req, res) {
	// Make sure they sent a file
	if (!req.file) {
		return renderTemplate(req, res, "Upload a File", "home", {
			error: "You must choose a file to upload",
		});
	}
	// Otherwise, try an upload
	req.user.upload(req.file, req).then(function(pics) {
		// res.redirect("/home" + pics.get("id"));
		res.redirect("/home?success=1");
	})
	.catch(function(err) {
		console.error("Something went wrong with upload", err);
		renderTemplate(req, res, "Upload a File", "upload", {
			error: "Something went wrong, please try a different file",
		});
	});
});
// Render an individual document
router.get("/photo/:fileId",requireLoggedIn, function(req, res) {
	File.findById(req.params.fileId).then(function(file) {
		if (file) {
			renderTemplate(req, res, file.get("name"), "home", {
				file: file,
			});
		}
		else {
			res.status(404);
			renderTemplate(req, res, "Not Found", "404");
		}
	})
	.catch(function(err) {
		console.error("Error while fetching file " + req.params.fileId, err);
		res.status(500).send("Something went wrong!");
	});
});




module.exports = router;
