var Post = require("../models/posts");
var Comment    = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkPostOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Post.findById(req.params.id, function(err, foundPost) {
            if (err || !foundPost) {
                // req.flash("error", "Post is not found");
                // res.redirect("back");
                res.json({message: "Post is not found"});
            } else {
                if (foundPost.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    res.json({
                        message: "You don't have permission for that!",
                        post_id: req.params.id
                    });
                    // req.flash("error", "You don't have permission for that!");
                    // res.redirect("/campgrounds/" + req.params.id);
                }
            }
        });
    } else {
        res.json({
                    message: "You need to be logged in to do that!",
                    post_id: req.params.id
                });
        // req.flash("error", "You need to be logged in to do that!");
        // res.redirect("/campgrounds/" + req.params.id);
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({
                message: "You need to be logged in to do that!"
            });
    // req.flash("error", "You need to be logged in to do that!");
    // res.redirect("/login");
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err || !foundComment) {
                res.json({message: "Comment is not found"});
                // req.flash("error", "Comment is not found");
                // res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    res.json({
                        message: "You don't have permission for that!",
                        post_id: req.params.id
                    });
                    // req.flash("error", "You don't have permission for that!");
                    // res.redirect("/campgrounds/" + req.params.id);
                }
            }
        });
    } else {
        res.json({
                    message: "You need to be logged in to do that!",
                    post_id: req.params.id
                });
        // req.flash("error", "You need to be logged in to do that!");
        // res.redirect("/campgrounds/" + req.params.id);
    }
}

module.exports = middlewareObj;