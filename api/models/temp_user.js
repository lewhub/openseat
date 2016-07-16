var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

var temp_schema = Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: { type: String },
    school: String,
    verify_url: String,
    createdAt: { type: Date, expires: "24h" }
})

temp_schema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

var Temp_User = mongoose.model("Temp_User", temp_schema);

module.exports = Temp_User;