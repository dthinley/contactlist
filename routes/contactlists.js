var express = require("express");
var router	= express.Router();
var Contactlist = require("../models/contactlist");
var middleware = require("../middleware");

var User 		= require("../models/user");


//INDEX - show all campgrounds
router.get("/", function(req, res){

	//get all contactlists from db
	Contactlist.find({}, function(err, allContactlists){
		if(err){
			console.log(err);
		} else {
			res.render("contactlists/index",{contactlists: allContactlists});

		}
	});
	
});

// CREATE ROUTES-add new data to database
router.post("/", middleware.isLoggedIn, function(req, res){
	//get data from form and add to contactlist array
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var address = req.body.address;
	var city	= req.body.city;
	var state = req.body.state;
	var email =	req.body.email;
	var phone = req.body.phone;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newContactlist = {first_name: first_name, last_name:last_name,
				address:address, city:city, state: state, email: email,
				phone:phone, author:author}
	//create a new contactlist and save to db
	console.log(req.user);
	Contactlist.create(newContactlist, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to contactlists page
			console.log(newlyCreated)
			res.redirect("/contactlists");
		}
	});
});

//NEW -SHOW FOR TO CREATE NEW CONTACT
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("contactlists/new");
});


//show page:- showing more info about one contact
router.get("/:id", function(req, res){
	//find the contactlist with id
	Contactlist.findById(req.params.id, function(err, foundContactlist){
		if(err){
			console.log(err);
		} else {
			
			//render show template with that contactlist
			res.render("contactlists/show", {contactlist: foundContactlist});
		}
	});
});

//EDIT ROUTE
router.get("/:id/edit", middleware.checkContactlistOwnership, function(req, res){
		Contactlist.findById(req.params.id, function(err, foundContactlist){
			res.render("contactlists/edit", {contactlist: foundContactlist});
		});
	});

//UPDATE ROUTE
router.put("/:id", middleware.checkContactlistOwnership, function(req, res){
	//find and update the correct contactlist
	Contactlist.findByIdAndUpdate(req.params.id, req.body.contactlist, function(err, updateContactlist){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/contactlists/" + req.params.id);
		}
	});
});


//DESTORY CONTACTLISTS
router.delete("/:id", middleware.checkContactlistOwnership, function(req, res){
	Contactlist.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/contactlists");
		} else {
			
			res.redirect("/contactlists");
		}
	});
});


module.exports = router;