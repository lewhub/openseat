var User = require("../models/user.js");
var jwt = require("jsonwebtoken");

module.exports = {
    index: function(req, res){
        User
            .find({})
            .exec(function(err, users){
                if (err) return console.log(err)
                res.json({success: true, message: "all users", users: users})
            })
    },
    create: function(req, res){
        var user = new User(req.body);
        user.password = user.generateHash(req.body.password);
        user.save(function(err, new_user){
            if (err) return console.log(err)
            var new_token = jwt.sign(new_user, process.env.secret, {
                expiresIn: "1h"
            })
            res.json({success: true, message: "new user created", user: new_user, token: new_token})
        })
    },
    show: function(req, res){
        User
            .findOne({_id: req.params.id})
            .exec(function(err, user){
                if (err) return console.log(err)
                res.json({success: true, message: "user found", user: user})
            })
    },
    update: function(req, res){
        if (req.params.id === req.decoded._doc._id){
            User
            .findOne({_id: req.params.id})
            .exec(function(err, user){
                if (err) return console.log(err)
                if (req.body.email){
                    user.email = req.body.email;
                }
                if (req.body.school){
                    user.school = req.body.school;
                }
                user.save(function(err, updated_user){
                    if (err) return console.log(err)
                    res.json({success: true, message: "user updated", user: updated_user})
                })
            })
        } else {
            return res.status(403).json({ success: false, message: "you can only update your own user account. this is a restricted area." })
        }
        
    },
    delete: function(req, res){
        if (req.params.id === req.decoded._doc._id){
             User
            .remove({_id: req.params.id}, function(err){
                if (err) return console.log(err)
                res.json({success: true, message: "user successfully deleted"})
            })
        } else {
            return res.status(403).json({ success: false, message: "you can only delete your own user account. this is a restricted area." })
        }
       
    },
    login: function(req, res){
        User
            .findOne({email: req.body.email})
            .exec(function(err, user){
                if (err) return console.log(err)
                if (!user) return res.json({success: false, message: "invalid email"})
                if (user && !user.validPassword(req.body.password)) return res.json({success: false, message: "the password you entered is incorrect. try again..."})
                var new_token = jwt.sign(user, process.env.secret, {
                    expiresIn: "1h"
                })
                res.json({success: true, message: "login successful", user: user, token: new_token})
            })
    },
    authenticate: function(req, res, next){
        var token = req.body.token || req.query.token || req["headers"]["x-access-token"];
        if (token){
            jwt.verify(token, process.env.secret, function(err, decoded){
                if (err) return res.json({ success: false, message: "your token is expired. please login again to continue." })
                req.decoded = decoded
                console.log("req.decoded._doc 75 user_ctrl.js\n", req.decoded._doc)
                next()
            })
        } else {
            return res.status(403).json({success: false, message: "no token found. this is a restricted section. please create an account or login."})
        }
    }
}