var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});

//show register form
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username}); //only username here
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//login
router.get("/login", function(req, res){
    res.render("login");
});

var redirects = {successRedirect: "campgrounds", failureRedirect: "login"};

router.post("/login", passport.authenticate("local", redirects), function(req, res){
});

//logout
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;