const express = require("express");
const User = require("../models/user");
const renderTemplate = require("../util/renderTemplate");
const requireLoggedOut = require("../middleware/requireLoggedOut");

const router = express.Router();
router.use(requireLoggedOut);
