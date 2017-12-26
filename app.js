const express = require('express')
const app = express();
const path = require('path') ;
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
mongoose.Promise = global.Promise;
const passport              = require("passport");
const User                  = require("./models/users");
const LocalStrategy         = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
var Crypto = require("crypto-js");
var cryptico = require("cryptico");
const router = express.Router();
var db = mongoose.connect("mongodb://localhost/test");
db.connection.on("error",function(err){
    console.log(err);
})

app.set('view engine', 'html');
const api           = require('./router/user.js'),
      commentRoutes = require("./router/comments"),
      postRoute     = require("./router/posts.js");    


app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/',(req,res) => {
  res.send('index');
});

app.use('/user',api);

var passPharse = "Ding Ma";
var privatekey = cryptico.generateRSAKey(passPharse, 1024);
var publicKey = cryptico.publicKeyString(privatekey);
//***********************************
//***********************************

app.get('/getKey', function(req, res) {
    res.json(publicKey);
})

app.post('/register',function(req,res){
  console.log('********************Data Before Decryption is: ***********************');
  console.log(req.body);
  console.log('*********************************************************************');
  var AES = cryptico.decrypt(req.body.AES,privatekey).plaintext;
  console.log('The AES key we got from Client is: '+AES);
    //decrypt received data using Symmetric key
    var username = Crypto.AES.decrypt(req.body.username.toString(), AES).toString(Crypto.enc.Utf8);
    var password = Crypto.AES.decrypt(req.body.password.toString(), AES).toString(Crypto.enc.Utf8);
    var email = Crypto.AES.decrypt(req.body.email.toString(), AES).toString(Crypto.enc.Utf8);
    var avatar = Crypto.AES.decrypt(req.body.avatar.toString(), AES).toString(Crypto.enc.Utf8);
    var adminCode = Crypto.AES.decrypt(req.body.adminCode.toString(), AES).toString(Crypto.enc.Utf8);
    var newUser = new User({
       username: username,
       email: email,
       avatar: avatar
   });
    console.log('********************Data after Decryption is: ***********************');
    console.log(newUser);
    console.log('*********************************************************************');
  if (req.body.type === "Admin"&& adminCode === "secretCode123") {
       newUser.isAdmin = true;
   } else if (req.body.type === "Doctor"&& adminCode === "secretCode123") {
       newUser.isDoctor = true;
   }
	var resp = res;
    User.register(newUser, password, function(err, user){
        if(err){
        	res.json({right:false});
            console.log(err);
        }else{
          res.json({right:true});
        }

    });
});

app.post("/login",function(req, res){
  console.log(req.body);
  var AES = cryptico.decrypt(req.body.AES,privatekey).plaintext;
  console.log(AES);
    //decrypt received data using Symmetric key
  req.body.username = Crypto.AES.decrypt(req.body.username, AES).toString(Crypto.enc.Utf8);
  req.body.password = Crypto.AES.decrypt(req.body.password, AES).toString(Crypto.enc.Utf8);
	passport.authenticate("local")(req, res, function(){
           res.json({
            right:true
           });
        });
});

app.get("/logout", function(req, res){
   console.log("logged out");
   req.logout();
   res.json({logout:true});
});
app.get("/getUser",function(req,res){
     res.json(req.user);
});

app.use("/posts", postRoute);
app.use("/posts/:id/comments", commentRoutes);

const port = process.env.PORT || 3000;

app.listen(3000,() => {
    console.log('app listening on port 3000.')
});

module.exports = app;

// http and tcp.port == 3000
// https://thumbs.dreamstime.com/z/ill-kid-16930761.jpg