var mongoose = require("mongoose")

var contactlistSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	address: String,
	city: String,
	state: String,
	zip: String, 
	email: String,
	phone: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	
});

module.exports = mongoose.model("Contactlist", contactlistSchema);
