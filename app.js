const express = require("express");
const bodyParser = require("body-parser");
const app = express();


// Handles post request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Render views using EJS
app.set("view engine", "ejs");
app.use(express.static("assets"));


app.get("/signup", function(req, res) {
	res.render("template", {
		page: "signup",
		pageArg: null,
	});
});
const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening at http://localhost:" + port);
});
