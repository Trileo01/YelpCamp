const express = require("express");
      router = express.Router();
      passport = require("passport");
      User = require("../Models/UserModel");

router.get("/", (req, res) => {
    res.render("Landing");
});

// ===========
// Auth Routes
// ===========
router.get("/signup", (req, res) => {
    res.render("Users/Register");
});

router.post("/signup", async (req, res) => {
    try {
        await User.register(new User({
            username: req.body.username
        }), req.body.password);
        passport.authenticate("local")(req, res, () => {
            req.flash("success","Signed Up Successfully")
            res.redirect("/Campgrounds");
        });
    } catch (error) {
        req.flash("error","User already exists!!")
        res.render("Users/Register");
    }
});

router.get("/signin", (req, res) => {
    res.render("Users/Register");
});

router.post("/signin", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/redirect"
}));

router.get("/logout", (req, res) => {
    req.logOut();
    req.flash("success","Successfully logged out!!");
    res.redirect("/campgrounds");
});

module.exports = router;