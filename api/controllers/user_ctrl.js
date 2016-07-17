var User = require("../models/user.js");
var Temp_User = require("../models/temp_user.js");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var ev = require("email-verification")(mongoose);
var dotenv = require("dotenv").load( { silent: true } );
var path = require("path");

// email configuration

// "http://localhost:8100/users/email-verification/${URL}" for local testing
// http://open-seat.herokuapp.com/users/email-verification/${URL} for deployment
ev.configure({
    verificationURL: "http://open-seat.herokuapp.com/users/email-verification/${URL}",
    persistentUserModel: User,
    tempUserModel: Temp_User,
    URLFieldName: "verify_url",
    transportOptions: {
        service: "Gmail",
        auth: {
            user: "openseat.startup@gmail.com",
            pass: process.env.email_password
        }
    },
     verifyMailOptions: {
        from: "<openseat.startup@gmail.com>",
        subject: "Open Seat: confirm account",
         html: '<p>Please verify your Open Seat account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
        'paste the following link into your browser:</p><p>${URL}</p>',
         text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
    },
    confirmMailOptions: {
        from: "<openseat.startup@gmail.com>",
        subject: "Open Seat: Account Confirmed",
        html: "<p>Your account has been verified. Welcome to Open Seat.</p>",
        text: "verified."
    }
}, function(err, options){
    if (err) return console.log(err);
})

module.exports = {
    index: function(req, res){
        User
            .find({})
            .exec(function(err, users){
                if (err) return console.log(err)
                res.json({success: true, message: "all users", users: users})
            })
    },
    // create: function(req, res){
    //     var user = new User(req.body);
    //     user.password = user.generateHash(req.body.password);
    //     user.save(function(err, new_user){
    //         if (err) return console.log(err)
    //         var new_token = jwt.sign(new_user, process.env.secret, {
    //             expiresIn: "1h"
    //         })
    //         res.json({success: true, message: "new user created", user: new_user, token: new_token})
    //     })
    // },
    create: function(req, res){
        ev.confirmTempUser(req.params.url, function(err, new_user){
            if (err) return console.log(err)
            if (!new_user) return res.json({success: false, message: "link expired. please request another."})
            else if (new_user) {
                var new_token = jwt.sign(new_user, process.env.secret, {
                    expiresIn: "1h"
                })
                res.send("<h1>Welcome to Open Seat!</h1><h1>Your Account has been confirmed by email!!</h1><h2>Please refer back to the app and login!</h2>");
                // res.json( { success: true, message: "user created and confirmed by email.", user: new_user, token: new_token } )
            }
        })
    },
    show: function(req, res){
        User
            .findOne({_id: req.params.id})
            .exec(function(err, user){
                if (err) return console.log(err)
                console.log("user USER USER USER", user)
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
                if (req.body.username){
                    user.username = req.body.username;
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
            .remove({_id: req.decoded._doc._id}, function(err){
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
    grant_token: function(req, res){
        User
            .findOne( { email: req.body.email } )
            .exec(function(err, user){
                if (err) return console.log(err)
                if (!user) return res.json( { success: false, message: "invalid email" } )
                var new_token = jwt.sign(user, process.env.secret, {
                    expiresIn: "1h"
                })
                res.json( { success: true, message: "token granted", user: user, token: new_token } )
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
    },
    update_password: function(req, res){
        User
            .findOne({_id: req.params.id})
            .exec(function(err, user){
                if (err) return console.log(err)
                if (!user.validPassword(req.body.password)) return res.json( { success: false, message: "the password you entered is incorrect. try again..." } )
                user.password = user.generateHash(req.body.new_password);
                user.save(function(err, updated_user){
                    if (err) return console.log(err)
                    res.json( { success: true, message: "password changed!", user: updated_user } )
                })
            })
    }
}