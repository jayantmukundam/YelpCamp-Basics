const campground = require("./models/campground");

var express        = require("express"),
    app            = express(),
	bodyParser     = require("body-parser"),
	flash          = require("connect-flash"),
	mongoose       = require("mongoose"),
	passport       = require("passport"),
	methodOverride = require("method-override"),
	LocalStrategy  = require("passport-local"),
	Campground     = require("./models/campground"),
	Comment        = require("./models/comment"),
	User           = require("./models/user");
	seedDb         = require("./seeds");

// Used for deploying (used in app.listen)
const host = '0.0.0.0';
const port = process.env.PORT || 3000;



// requiring routes	
var commentRoutes    = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes      = require("./routes/index");



// mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb+srv://jayantmukundam:jayant%402811@cluster0.jdk5u.mongodb.net/yelpcamp?retryWrites=true&w=majority", 
{
	useNewUrlParser: true,
	 useUnifiedTopology: true
})
	 .then(()=>{
	console.log("Mongodb connected")	
})
.catch(err=>console.log(err.message))
;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDb();


//PASSWORD CONFIGURATION
app.use(require("express-session")({
	secret : "Secret sentence",
	resave : false,
	saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Used to send the logged in/out details to every route so that correct navbar links are displayed.
//req.user contains username and password
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);





app.listen(port, host, function() {

	console.log("YelpCamp Server has Started");
});