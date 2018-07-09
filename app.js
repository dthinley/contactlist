var express 		= require("express"),
	mongoose		= require("mongoose"),
	bodyParser		= require("body-parser"),
	passport		= require("passport"),
	flash			= require("connect-flash"),
	methodOverride	= require("method-override"),
	session 		= require("express-session"),
	LocalStrategy	= require("passport-local"),
	Contactlist  	= require("./models/contactlist"),
	User			= require("./models/user"),
	app				= express();

//list of routes
var contactlistRoutes 	= require("./routes/contactlists"),
	indexRoutes			= require("./routes/index");

var port=process.env.PORT || 3000;
app.listen(port || 3000,function(){
 console.log('Server has started')
});


//mongoose.connect("mongodb://localhost/contact");
mongoose.connect("mongodb://<user_name>:<password>@ds129831.mlab.com:29831/contactcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//PASSPORT CONFIG
app.use(require("express-session")({
	secret: "this is a secret mount",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.user = req.user;
	res.locals.contactlists =req.contactlists;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/contactlists", contactlistRoutes);



app.listen(3000, function(){
	console.log("Server up and running..");
});

