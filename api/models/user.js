var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

var user_schema = Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    username: {type: String},
    school: String
})

user_schema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

user_schema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model("User", user_schema);

module.exports = User;