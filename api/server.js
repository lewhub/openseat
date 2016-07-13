var express = require("express");
var app = express();
var mongoose = require("mongoose");
var body_parser = require("body-parser");
var morgan = require("morgan");
var path = require("path");
var dotenv = require("dotenv").config({ silent: true });
var port = process.env.PORT || 8100;

// routes
var user_rts = require("./routes/user_rts.js");

// console.log(process.env)

// for testing mlab database
mongoose.connect(process.env.MLAB_URI, function(err){
    if (err) return console.log(err)
    console.log("connected to mongodb")
})

// for testing local mongo database
// mongoose.connect("mongodb://localhost/library_app", function(){
//     console.log("connected to mongodb at library_app")
// })




// package middleware
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "../www")));

// route middleware
app.use("/users", user_rts);

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "../www", "index.html"))
})

console.log("this is PORT >>>>>>>", port)
app.listen(port, function(err){
    if (err) return console.log(err)
    console.log("listening on port 8100")
})