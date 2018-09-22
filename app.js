var express    = require("express"),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    Campground = require('./models/campgrounds');
    seedDB     = require("./seed")
    app        = express();

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //to avoid .ejs at the end of the file

seedDB();

app.get("/", function(req, res){
    res.render("landing");
});
    
app.get("/campgrounds", function(req, res){
    //retrive campground from database
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index", {campgrounds: campgrounds});
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
    //gets comments from id and attach it to foundCampground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var campground = {name: name, image: image, description: description};

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
        res.redirect("/campgrounds");
    }
}

//starts server
app.listen("3000", function(){
        console.log("YelpCamp served stated at port 3000");
    });