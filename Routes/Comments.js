const express = require("express");
router = express.Router();
Campground = require("../Models/CampgroundModel");
Comment = require("../Models/CommentModel");

// ===========
// Comments Routes
// ===========

//NEW COMMENT
router.post("/:id/comments", async (req, res) => {
    try {
        const camp = await Campground.findById(req.params.id);
        const comment = await Comment.create(req.body.comment);
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        comment.save();
        camp.comments.push(comment);
        camp.save();
        res.redirect(`/campgrounds/${req.params.id}`);
    } catch (error) {
        res.send("Some error occured while posting the comment!!");
    };
});

//UPDATE COMMENT
router.put("/:id/comments/:comment_id", checkCommentOwnership, async (req, res) => {
    try {
        await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment);
        res.redirect(`/campgrounds/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.redirect("back");
    }
});

//DELETE COMMENT
router.delete("/:id/comments/:comment_id", checkCommentOwnership, async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.comment_id);
        res.redirect("back");
    } catch (error) {
        res.redirect(`/campgrounds/${req.params.id}`);
    }
});

//MIDDLEWARE
async function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        try {
            foundComment = await Comment.findById(req.params.comment_id);
            if (foundComment.author.id.equals(req.user._id)) {
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