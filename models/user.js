var mongoose				= require("mongoose");
var passportLocalMongoose 	= require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	passport: String,
	avatar: String,
	firstName: String,
	lastName: String,
	email: String,

});


UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);