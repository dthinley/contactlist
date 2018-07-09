var express 	= require("express");
var router		= express.Router();
var passport 	= require("passport");
var User 		= require("../models/user");
var Contactlist = require("../models/contactlist");

//root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
     res.render("register", {page: 'register'});  
});

//SIGN UP/REGISTER ROUTE LOGIC
router.post("/register", function(req, res){
	var newUser = new User(
		{
			username: req.body.username,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			avatar: req.body.avatar
		});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			return res.render("register", {error: err.message});
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
			res.redirect("/contactlists");
		});
	});
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/users/show",
		failureRedirect: "/login"
		
		
	}), function(req, res){
});

//logic logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You are logged out!")
	res.redirect("/")
});

//show profile page route
router.get("/users/show", function(req, res){
	console.log("users")
      res.redirect("/users/"+req.user._id﻿ );
   
});

/// USER PROFILE
router.get("/users/:id", function(req, res) {
  User.findById(req.params.id, function(err, foundUser) {
    if(err) {
      req.flash("error", "Something went wrong here.");
      return res.redirect("/");
    }
    Contactlist.find().where('author.id').equals(foundUser._id).exec(function(err, contactlists) {
      if(err) {
        req.flash("error", "Something went wrong.");
        return res.redirect("/");
      }
      res.render("users/show", {user: foundUser, contactlists: contactlists});
    })
  });
});


module.exports = router;
