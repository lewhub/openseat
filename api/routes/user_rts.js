var express = require("express");
var user_router = express.Router();
var user_ctrl = require("../controllers/user_ctrl.js");


// create a user or login to a user account
user_router.post("/", user_ctrl.create);
user_router.post("/login", user_ctrl.login);
// show all users
user_router.get("/", user_ctrl.index);


// for routes that require authentication before continuing
user_router.use(user_ctrl.authenticate);

// edit, delete and show one user
user_router.get("/:id", user_ctrl.show);
user_router.patch("/:id", user_ctrl.update);
user_router.delete("/:id", user_ctrl.delete);



module.exports = user_router;