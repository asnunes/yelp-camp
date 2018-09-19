var express = require("express");
var app = express();
var bodyParser = require('body-parser');

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

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //to avoid .ejs at the end of the file

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var campground = {name: name, image: image};

    campgrounds.push(campground);
    res.redirect("/campgrounds"); //default is get request
});

app.listen("3000", function(){
    console.log("YelpCamp served stated at port 3000");
});