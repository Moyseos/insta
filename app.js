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
app.use("/", signUpRouter);


const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening at http://localhost:" + port);
});
