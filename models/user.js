var mongoose              = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose"); // allow add feature to mongose schema

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

UserSchema.plugin(passportLocalMongoose); // add auth features 

var userModel = mongoose.model("User", UserSchema);
module.exports = userModel;