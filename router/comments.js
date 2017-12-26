var express    = require("express");
var router     = express.Router({mergeParams: true});
var Post = require("../models/posts");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

//creat new comment GET route
router.get("/", middleware.isLoggedIn, function(req, res) {
     Post.findById(req.params.id, function(err, post) {
         if (err || !post) {
            // req.flash("error", "Post is not found");
            // res.redirect("/posts/" + req.params.id);
            res.json({message: "Post is not found"});
         } else {
            res.json(post);
            //res.render("comments/new", {post : post});
         }
     });
});
//creat new comment POST route
router.post("/", middleware.isLoggedIn, function(req, res) {
    Post.findById(req.params.id, function(err, post) {
         if (err || !post) {
            //  req.flash("error", "Post is not found");
            //  res.redirect("/posts/" + req.params.id);
            res.json({message: "Post is not found"});
         } else {
            console.log(req.body);
             Comment.create(req.body, function(err, comment) {
                 if (err) {
                     res.json({message: "ERROR on comment create"});
                 } else {
                     comment.author.id = req.user._id;
                     comment.author.username = req.user.username;
                     comment.save();
                     post.comments.push(comment);
                     post.save();
                     res.json({
                         message: "New comment created",
                         post_id: post._id
                     });
                    //  req.flash("success","New comment created");
                    //  res.redirect("/posts/" + post._id);
                 }
             });
         }
     });
});

//edit comment GET route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err || !foundComment) {
            res.json({message: "Comment is not found"});
            // req.flash("error", "Comment is not found");
            // res.redirect("back");
        } else {
            res.json({
                post_id: req.params.id,
                comment: foundComment
            });
            //res.render("comments/edit", {post_id: req.params.id, comment: foundComment});
        }
    });
}); 

//edit comment PUT route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment) {
        if (err || !foundComment) {
            res.json({message: "Comment is not found"});
            // req.flash("error", "Comment is not found");
            // res.redirect("back");
        } else {
            res.json({
                message: "Successfully Updated!",
                post_id: req.params.id
            });
            // req.flash("success","Successfully Updated!");
            // res.redirect("/posts/" + req.params.id);
        }
    });
});

//destroy comment route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.json({message: "Didn't find that comment"});
            // req.flash("error", "Didn't find that comment");
            // res.redirect("back");
        } else {
            res.json({
                message: "Successfully Updated!",
                post_id: req.params.id
            });
            // req.flash("error", "Comment deleted");
            // res.redirect("/posts/" + req.params.id);
        }
    });
});



module.exports = router;