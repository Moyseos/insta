require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/users");
const sql = require("./util/sql");
const signUpRouter = require("./router/signup");
const session = require("express-session");
const renderTemplate = require("./util/renderTemplate");

const app = express();


// Handles post request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Render views using EJS
app.set("view engine", "ejs");
app.use(express.static("assets"));


// Routers
// app.use("/", signUpRouter);
app.get("/", function(req, res) {
	renderTemplate(res, "template");
});

app.get("/signup", function(req, res) {
	renderTemplate(res, "Signup", "signup");
});
app.post("/signup", function(req, res) {
	User.create({
		id: req.body.id,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
	})
	.then(function(user) {
		console.log(user);
		req.session.User.id = User.id;
		req.redirect("/");
	})
	.catch(function(err) {
		console.log(err);
		renderTemplate(res, "Signup", "signup", {
			error: "Invalid username or password",
		});
	});
});

app.get("/login", function(req, res) {
	renderTemplate(res, "Login", "login");
});

app.post("/login", function(req, res) {
	User.findOne({
		where: {

			username: req.body.username,
		},
	})
	.then(function(user) {
		if (user) {
			user.comparePassword(req.body.password).then(function(valid) {
				if (valid) {
					req.session.userid = user.get("id");
					res.redirect("/");
				}
				else {
					renderTemplate(res, "Login", "login", {
						error: "Incorrect password",
					});
				}
			});
		}
		else {
			renderTemplate(res, "Login", "login", {
				error: "Username not found",
			});
		}
	})
	.catch(function(err) {
		console.log(err);
		renderTemplate(res, "Login", "login", {
			error: "The database exploded, please try again",
		});
	});
});

sql.sync().then(function() {
	console.log("Database initialized!");
	const port = process.env.PORT || 3000;
	app.listen(port, function() {
		console.log("Listening at http://localhost:" + port);
	});
});
