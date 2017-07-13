const express = require("express");
const multer = require("multer");

const User = require("../models/user");
const File = require("../models/file");
const renderTemplate = require("../util/renderTemplate");
const requireLoggedIn = require("../middleware/requireLoggedIn");

const uploader = multer({ dest: "uploads/" });
const router = express.Router();
router.use(requireLoggedIn);

// Render all of a user's documents
router.get("/home", function(req, res) {
	let message = "";

	if (req.query.success) {
		message = "File uploaded succesfully!";
	}

	req.user.getFiles().then(function(pics) {
		renderTemplate(req, res, "My Documents", "docs", {
			username: req.user.get("username"),
			pics: pics,
			message: message,
		});
	});
});

// Render an upload form that POSTs to /docs/upload
router.get("/upload", function(req, res) {
	renderTemplate(req, res, "Upload a File", "upload");
});

// Upload the form at GET /docs/upload
router.post("/upload", uploader.single("file"), function(req, res) {
	// Make sure they sent a file
	if (!req.file) {
		return renderTemplate(req, res, "Upload a File", "upload", {
			error: "You must choose a file to upload",
		});
	}

	// Otherwise, try an upload
	req.user.upload(req.file).then(function() {
		res.redirect("/docs?success=1");
	})
	.catch(function(err) {
		console.error("Something went wrong with upload", err);
		renderTemplate(req, res, "Upload a File", "upload", {
			error: "Something went wrong, please try a different file",
		});
	});
});

// Render an individual document
router.get("/photo/:fileId", function(req, res) {
	File.findById(req.params.fileId).then(function(file) {
		if (file) {
			renderTemplate(req, res, file.get("name"), "document", {
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
