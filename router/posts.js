var express = require("express");
var router = express.Router();
var Post = require("../models/posts");
var middleware = require("../middleware/");

router.get("/", function(req, res) {
    Post.find({}, function (err, foundPosts) {
        if (err) {
            console.log(err);
        } else {
            res.json( {data: foundPosts});
            //res.render("posts/index", {data:foundPosts, page: 'posts'});
        }
    });
    
});

//render form 
//**************************************************************
//创建新的post，交给前端
// router.get("/new", middleware.isLoggedIn, function(req, res) {
//     res.render("posts/new");
// });
//creat new post POST route
router.post("/", middleware.isLoggedIn, function(req, res) {
    console.log(req.body);
    var newData = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        },
    };

    Post.create(newData, function(err, newlyCreated) {
        if (err) {
            res.json( {message: "ERROR"});
            console.log(err);
        } else {
            // req.flash("success","New post created");
            // res.redirect("/posts");
            res.json( {message: "New post created"});
        }
    });
});

//show specific post and show comments correspond to that post
router.get("/:id", function(req, res) {
    Post.findById(req.params.id).populate("comments").exec(function(err, foundPost) {
        if (err || !foundPost) {
            // req.flash("error", "Post is not found");
            // res.redirect("back");
            res.json({message: "Post is not found"});
        } else {
            res.json({post: foundPost});
            //res.render("posts/show", {post:foundPost});
        }
    });
    
});

//EDIT ROUTE
router.get("/:id/edit", middleware.checkPostOwnership, function(req, res) {
    Post.findById(req.params.id, function(err, foundPost) {
        if (err || !foundPost) {
            console.log(err);
            res.json({message: "Post is not found"});
            // req.flash("error", "Post is not found");
            // res.redirect("back");
        } else {
            res.json({post: foundPost});
            //res.render("posts/edit", {post:foundPost});
        }
    });
    
});

//Update route
router.put("/:id", middleware.checkPostOwnership, function(req, res) {
    var newData = {
        name: req.body.name, 
        image: req.body.image, 
        description: req.body.description
    };
    Post.findByIdAndUpdate(req.params.id, newData, function(err, post){
        if(err){
            res.json({message: "Post is not found"});
            // req.flash("error", "Post is not found");
            // res.redirect("back");
        } else {
            res.json({
                message: "Successfully Updated",
                post_id: post._id
            });
            // req.flash("success","Successfully Updated!");
            // res.redirect("/posts/" + post._id);
        }
    });
});


//destroy router
router.delete("/:id", middleware.checkPostOwnership, function(req, res) {
    Post.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.json({message: "ERROR"});
            // res.redirect("/posts");
        } else {
            res.json({message: "Post deleted"});
            // req.flash("error", "Post deleted");
            // res.redirect("/posts");
        }
    });
});

//GET route to creat new states
// router.get("/:id/states/new", function(req, res) {
//     res.render("post/states");
// });

router.post("/:id/states", function(req, res) {
    Post.findById(req.params.id, function(err, foundPost) {
        if (err || !foundPost) {
            res.json({message: "Post is not found"});
            // req.flash("error", "Post is not found");
            // res.redirect("back");
        } else {
            console.log(req.body);
            foundPost.states.unshift(req.body);
            foundPost.save();
            res.json({message: "New status created"});
            //res.render("posts/edit", {post:foundPost});
        }
    });
});


module.exports = router;