var express = require("express");
var temp_router = express.Router();
var temp_ctrl = require("../controllers/temp_user_ctrl.js");

// show all tmeporary users in database
temp_router.get("/", temp_ctrl.index);
// create a new temp user when signing up
temp_router.post("/signup", temp_ctrl.signup);

module.exports = temp_router;