var express = require("express");
var user_router = express.Router();
var user_ctrl = require("../controllers/user_ctrl.js");


// email verification route
user_router.get("/email-verification/:url", user_ctrl.create);
// user_router.post("/", user_ctrl.create);


// login to a user account

user_router.post("/login", user_ctrl.login);
// show all users
user_router.get("/", user_ctrl.index);
// edit, delete and show one user
user_router.get("/:id", user_ctrl.show);
// grant a token on email confirm
user_router.post("/grant-token", user_ctrl.grant_token);


// for routes that require authentication before continuing
user_router.use(user_ctrl.authenticate);

user_router.patch("/change-password/:id", user_ctrl.update_password);
user_router.patch("/:id", user_ctrl.update);
user_router.delete("/:id", user_ctrl.delete);



module.exports = user_router;