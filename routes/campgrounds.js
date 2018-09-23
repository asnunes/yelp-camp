var express = require("express");
var router = express.Router();
var Campground = require('../models/campgrounds');
var middleware = require('../middleware');

//  campgrounds routes
router.get('/', function (req, res) {
  //  retrive campground from database
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds/index', {campgrounds: campgrounds})
    }
  })
})

router.get('/new', middleware.isLoggedIn,function(req, res){
    res.render('campgrounds/new');
});

router.get("/:id", function(req, res){
    //gets comments from id and attach it to foundCampground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

router.get('/:id/edit', middleware.checkCampgroundOwnership,function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render('campgrounds/edit', {campground: foundCampground});
    });
});

router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        res.redirect('/campgrounds/' + req.params.id);
    });
});

router.delete('/:id',  middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        res.redirect('/campgrounds');
    });
});

router.post("/", middleware.isLoggedIn,function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {id: req.user._id, username: req.user.username};
    var campground = {name: name, image: image, description: description, author: author};

    Campground.create(campground, function(err, campground){
        newCampgroundCreated(err, campground, res);
    });
});

//aux functions
function newCampgroundCreated(err, campground, res){
    if(err){
        console.log(err);
    } else{
        console.log("A new campground has been created");
        console.log(campground);
        res.redirect("/");
    }
}

module.exports = router;
