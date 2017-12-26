const mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
  username : String,
  password : String,
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
  isAdmin: {type: Boolean, default: false},
  isDoctor: {type: Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose);

const User = module.exports = mongoose.model('User',userSchema);