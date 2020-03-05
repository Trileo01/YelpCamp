const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash");
    passport = require("passport"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    User = require("./Models/UserModel");

const camgroundRoutes = require("./Routes/Campgrounds");
      commentRoutes = require("./Routes/Comments");
      indexRoutes = require("./Routes/index");

mongoose.connect("mongodb+srv://Trileo:O@24wMZkuYtOUP90@yelpcamp-bbmsk.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/Public"));
app.use(methodOverride("_method"));
app.use(flash());

//Passport Configuration
app.use(require('express-session')({
    secret: 'Trileo is the best player',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    res.locals.errorMsg = req.flash("error");
    res.locals.successMsg = req.flash("success");
    next();
});

app.use("/campgrounds",camgroundRoutes);
app.use("/campgrounds",commentRoutes);
app.use("/",indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
 });

// Database UserName : Trileo 
// Database Password : O@24wMZkuYtOUP90