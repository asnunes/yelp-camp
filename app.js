var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //to avoid .ejs at the end of the file

//campground schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

//model from schema
var Campground = mongoose.model("Campground", campgroundSchema);

//create defaults campgrounds - doesn't work anymore
//var campground = {name: "Salmon Creek", image:"https://farm7.staticflickr.com/6139/6016438964_f6b8e1fee2.jpg"};
//var campground2 = {name: "Granite Hill", image:"https://farm4.staticflickr.com/3144/2984126071_c462b62623.jpg"};
//Campground.create(campground2, newCampgroundCreated);

//requests
var campgrounds = [
    {name: "Salmon Creek", image:"https://farm7.staticflickr.com/6139/6016438964_f6b8e1fee2.jpg"},
    {name: "Granite Hill", image:"https://farm4.staticflickr.com/3144/2984126071_c462b62623.jpg"},
    {name: "Montain's Rest", image:"https://farm3.staticflickr.com/2582/3820664827_6c2e9a69ae.jpg"},
    {name: "Salmon Creek", image:"https://farm7.staticflickr.com/6139/6016438964_f6b8e1fee2.jpg"},
    {name: "Granite Hill", image:"https://farm4.staticflickr.com/3144/2984126071_c462b62623.jpg"},
    {name: "Montain's Rest", image:"https://farm3.staticflickr.com/2582/3820664827_6c2e9a69ae.jpg"},
    {name: "Salmon Creek", image:"https://farm7.staticflickr.com/6139/6016438964_f6b8e1fee2.jpg"},
    {name: "Granite Hill", image:"https://farm4.staticflickr.com/3144/2984126071_c462b62623.jpg"},
    {name: "Montain's Rest", image:"https://farm3.staticflickr.com/2582/3820664827_6c2e9a69ae.jpg"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //retrive campground from database
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds", {campgrounds: campgrounds});
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var campground = {name: name, image: image};

    Campground.create(campground, function(err, campground){
        createNewCampground(err, campground, res);
    });
});

//aux functions
function createNewCampground(err, campground, res){
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