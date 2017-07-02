require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/users");
const sql = require("./util/sql");
const signUpRouter = require("./router/signup");
const app = express();


// Handles post request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Render views using EJS
app.set("view engine", "ejs");
app.use(express.static("assets"));


// Routers
app.use("/", signUpRouter);

app.post("/signup", function(req, res) {
	User.create({
		id: req.body.id,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
	});
});
sql.sync().then(function() {
	console.log("Database initialized!");
	const port = process.env.PORT || 3000;
	app.listen(port, function() {
		console.log("Listening at http://localhost:" + port);
	});
});
