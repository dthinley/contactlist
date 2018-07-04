var Contactlist = require("../models/contactlist");

//all middleware
var middlewareObj = {};

middlewareObj.checkContactlistOwnership = function(req, res, next ){
	if(req.isAuthenticated()){
		Contactlist.findById(req.params.id, function(err, foundContactlist){
		if(err){
			res.redirect("back")
		} else {
			//does user own the contactlist
			if(foundContactlist.author.id.equals(req.user._id)){
				next();
			} else {
				res.redirect("back");
			}
		}
	});
		} else {
			res.redirect("back");
	}	
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please login First!");
	res.redirect("/login");
}

module.exports = middlewareObj