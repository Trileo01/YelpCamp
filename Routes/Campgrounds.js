const express = require("express");
router = express.Router();
Campground = require("../Models/CampgroundModel");

//=============
//CAMPGROUND ROUTES
//=============

//VIEW CAMPGROUNDS
router.get("/", async (req, res) => {
    try {
        const campgrounds = await Campground.find({});
        res.render("Campgrounds/Campgrounds", {
            campgrounds
        });
    } catch (err) {
        res.send("Some error occured while fetching");
    }
});

//CREATE CAMPGROUND
router.post("/", isLoggedIn, async (req, res) => {
    const author = {
        id: req.user._id,
        username: req.user.username
    };
    const newCampground = {
        name: req.body.name,
        image: req.body.image_url,
        description: req.body.desc,
        author: author
    };
    try {
        await Campground.create(newCampground);
        res.redirect("Campgrounds");
    } catch (error) {
        res.send("Some error occured while inserting!");
    }
});

router.get("/new", isLoggedIn, (req, res) => {
    res.render("Campgrounds/New");
});

//VIEW SPECIFIC CAMPGROUND
router.get("/:id", async (req, res) => {
    try {
        const campground = await Campground.findById(req.params.id).populate({
            path: "comments"
        });
        res.render("Campgrounds/Show", {
            campground,
            req
        });
    } catch (error) {
        res.send("Some error occured while loading");
    }
});

//EDIT CAMPGROUND
router.get("/:id/edit", checkCampgroundOwnership, async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("Campgrounds/Edit", {
        campground
    });
});

//UPDATE CAMPGROUND
router.put("/:id", checkCampgroundOwnership, async (req, res) => {
    try {
        await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
        res.redirect(`/campgrounds/${req.params.id}`);
    } catch (error) {
        res.redirect("/campgrounds");
    }
});

//DESTROY CAMPGROUND
router.delete("/:id", checkCampgroundOwnership, async (req, res) => {
    try {
        await Campground.findByIdAndDelete(req.params.id);
    } catch (error) {
        res.redirect("/campgrounds");
    }
});

//Middleware
function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/signin");
}

async function checkCampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        try {
            const campground = await Campground.findById(req.params.id);
            if (campground.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
        } catch (error) {
            res.redirect("back");
        }
    } else {
        res.redirect("back");
    }
}

module.exports = router;