const express = require('express');
const router = express.Router();
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
var Crypto = require("crypto-js");
var cryptico = require("cryptico");
var passport = require("passport");
var User = require("../models/users");
var Post = require("../models/posts");
//var middleware = require("../middleware/middleware");
const mongoose = require('mongoose');

// var test = new User({
//   userName : "test1",
//   poster   : "String",
//   rating   : "String",
//   introduction : "String"
// });
// router.post('/db', function(req,res){
// 	User.create(test,(err,user) => {
// 		if(err){
//            console.log(err);
// 		}
// 	});
// });

router.get('/info/:username',isLoggedIn,function(req,res){
	User.findOne({username:req.params.username})
	.then(user => {
		res.json(user);
	});
});

router.post('/info/:username',isLoggedIn,function(req,res){
    User.findOne({username:req.params.username})
    .then(user => {
    	console.log(user);
    	res.json(user);
       Post.create(req.body, (err, post) =>{
       	   if(err){
       	   	res.json(err);
       	   }else{
       	   	user.poster.push(post.event);
       	   	user.posts.push(post);
       	   	user.save();
       	   }
       })
    });
});
// passport.authenticateMiddleware = function authenticationMiddleware() {
//     return function(req, res, next) {
//       if (req.isAuthenticated()) {
//        return next();
//       }
//     }
// }
// router.get('/', (req, res) => {
//      res.send("user test");
// });

// router.post("/register", function(req, res){
//     var newUser = new User({username: req.body.username});
//     User.register(newUser, req.body.password, function(err, user){
//         if(err){
//             req.flash("error", err.message);
//         }
//         passport.authenticate("local")(req, res, function(){
//              req.flash("success", "Welcome to health web " + user.username);
//         });
//     });
// });

// router.post("/login", passport.authenticate("local"), function(req, res){
// 	log.info(req.user);
//     res.json({login:"success"});
// });

// // get imformation of a user
// router.get('/user/:username',  passport.authenticateMiddleware(), (req, res) => {
//   User.find({ username : req.params.username})
//        .sort({ update_at : -1})
//        .then(users => {
//          res.json(users);
//        })
//        .catch(err => {
//          res.json(err);
//        })
// });;
// // get detail imformation for key exchange
// router.post('/user/:id', middleware.checkOwnership, (req, res) => {
//   User.findById(req.params.id)
//     .then(info => {
//       var key = req.body.publicKey;
//       var EncryptionResult = cryptico.encrypt(info.introduction, key);
//       var digit = Crypto.MD5(info.introduction);
//       res.json({
//         ciper: EncryptionResult.cipher,
// 	    digit: digit.toString()
//       })
//     })
//     .catch(err => {
//       res.json(err)
//     })
// })
// // adding
// router.post('/user/add', middleware.isLoggedIn, passport.authenticateMiddleware(),(req, res) => {
//   User.create(req.body, (err, user) => {
//     if (err) {
//       res.json(err)
//     } else {
//       res.json(user)
//     }
//   })

// })
// //update
// router.put('/user/:id/edit',middleware.checkOwnership,(req,res) => {
//   User.findOneAndUpdate({ _id : req.params.id}
//        ,{ $set : { username: req.body.username,
//          introduction : req.body.introduction }
//          },{
//            new : true
//          })
//        .then(user => res.json(user))
//        .catch(err => res.json(err))
// });
// //delete
// router.delete('/user/:id/delete',middleware.checkOwnership,(req,res) => {
//   User.findOneAndRemove({
//         _id : req.params.id
//         })
//        .then(user => res.send(`${user.title} deleted`))
//        .catch(err => res.json(err))
// });
// router.post('/dingma/:id' ,function(req,res){
// 	console.log(req.params.id);
// 	console.log(req.body);
// 	res.send("get post");
// });

router.post('/dingma', function(req,res){
	var data = {
		name : "hello"
	};
	var ciphertext =AES.encrypt(JSON.stringify(data), 'secret key 123');
 
// Decrypt 
    var bytes  = AES.decrypt(ciphertext.toString(), 'secret key 123');
    var decryptedData = JSON.parse(bytes.toString(Crypto.enc.Utf8));
   
    console.log(decryptedData);
    res.json(decryptedData);
});

router.post('/dingma/test', function(req,res){
	var key = req.body.publicKey;
	console.log(req.body);
	var random = Math.floor(Math.random()*10).toString();
	var encryptedMessage = AES.encrypt(JSON.stringify(req.body),random);
	console.log("receive the pulbic key from client: " + key);
	console.log("************************************************************************");
	var EncryptionResult = cryptico.encrypt(random, key);
	console.log("The original message is: Encrpty this message. The encrypted message is " + encryptedMessage);
	console.log("************************************************************************");
	var digit = Crypto.MD5("Encrpty this message");
	console.log("Digit Signature for this message: " + digit.toString());
	var obj = AES.decrypt(encryptedMessage.toString(),random);
	//var obj = JSON.parse(obj.toString(Crypto.enc.Utf8));
	res.json({ciper: EncryptionResult.cipher,
	          digit: digit.toString(),
	          cipherText: encryptedMessage,
	          body : obj
	      });
});

router.get('/user/ma',isLoggedIn, (req, res) => {
     res.send("ding ma");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.send("login!");
}
module.exports = router;