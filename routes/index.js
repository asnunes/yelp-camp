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
            req.flash('error', err.message + '.');
            res.redirect("/register");
        } else{
            passport.authenticate("local")(req, res, function(){
                req.flash('sucess', 'Welcome, ' + user.username + '.');
                res.redirect("/campgrounds");
        });
    }
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
    req.flash('sucess', 'Bye!');
    res.redirect("/campgrounds");
});

module.exports = router;