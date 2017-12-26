var mongoose = require("mongoose");

var postsSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   created_at : { type : Date, default : Date.now },
   update_at : { type : Date, default : Date.now },
   author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    states:[]
});

module.exports = mongoose.model("post", postsSchema);