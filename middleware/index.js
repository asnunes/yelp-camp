var Campground = require('../models/campgrounds'),
    Comment    = require('../models/comment');

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");    
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //check if user is loggin in
    if(req.isAuthenticated()){
        //check if is the campground owner
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err){
                console.log(err);
            } else {
                 if(foundCampground.author.id.equals(req.user._id)){
                     next();
                 } else{
                     res.redirect('back');
                 }
             }
        })
     } else {
         res.redirect('back');
     }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    //check if user is loggin in
    if(req.isAuthenticated()){
        //check if is the comment owner
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err){
                console.log(err);
            } else {
                 if(foundComment.author.id.equals(req.user._id)){
                     next();
                 } else{
                     res.redirect('back');
                 }
             }
        })
     } else {
         res.redirect('back');
     }
};

module.exports = middlewareObj;