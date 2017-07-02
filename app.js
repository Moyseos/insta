const express = require("express");
const bodyParser = require("body-parser");
const signUpRouter = require("./router/signup");
const app = express();


// Handles post request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Render views using EJS
app.set("view engine", "ejs");
app.use(express.static("assets"));


// Routers
app.get("/signup", function(req, res) {
	res.render("pages/signup");
});

app.get("/", function(req, res) {
	res.render("pages/login");
});



const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening at http://localhost:" + port);
});
