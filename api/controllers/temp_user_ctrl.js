var User = require("../models/user.js");
var Temp_User = require("../models/temp_user.js");
var mongoose = require("mongoose");
var ev = require("email-verification")(mongoose);
var dotenv = require("dotenv").load( { silent: true } );

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
        subject: "Open Seat: Confirm Your Account",
         html: '<p>Please verify your Open Seat account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
        'paste the following link into your browser:</p><p>${URL}</p>',
         text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
    },
    confirmMailOptions: {
        from: "<openseat.startup@gmail.com>",
        subject: "Open Seat: Account Confirmed",
        html: "<p>Your account has been verified. Welcome to Open Seat!</p>",
        text: "verified."
    }
}, function(err, options){
    if (err) return console.log(err);
})

module.exports = {
    index: function(req, res){
        Temp_User
            .find({})
            .exec(function(err, temp_users){
                if (err) return console.log(err)
                res.json( { success: true, message: "all temporary users", temporary_users: temp_users } )
            })
    },
    signup: function(req, res){
        var new_temp_user = new Temp_User(req.body);
        new_temp_user.password = new_temp_user.generateHash(req.body.password);
        ev.createTempUser(new_temp_user, function(err, existing_user, temp_user){
            if (err) return console.log(err)
            if (existing_user) return res.json( { success: false, message: "account already verified" } )
            else if (temp_user){
                var url = temp_user[ev.options.URLFieldName];
                ev.sendVerificationEmail(temp_user.email, url, function(err, info){
                    if (err) return console.log(err)
                    res.json( { success: true, message: "email sent", info: info, user: temp_user } );
                })
            } else {
                res.json( { success: false, message: "verification email already sent" } )
            }

        })
    }
}