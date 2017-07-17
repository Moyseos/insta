const express = require("express");
const User = require("../models/user");
const File = require("../models/file");
const Comments = require("../models/comments");
const Likes = require("../models/likes");
const renderTemplate = require("../util/renderTemplate");
const requireLoggedIn = require("../middleware/requireLoggedIn");

const router = express.Router();
