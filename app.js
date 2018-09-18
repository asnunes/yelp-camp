var express = require("express");
var app = express();

app.set("view engine", "ejs"); //to avoid .ejs at the end of the file

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    campgrounds = [
        {name: "Salmon Creek", image:"https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f7c379a2ecb2bd_340.jpg"},
        {name: "Granite Hill", image:"https://farm4.staticflickr.com/3144/2984126071_c462b62623.jpg"},
        {name: "Montain's Rest", image:"https://farm3.staticflickr.com/2582/3820664827_6c2e9a69ae.jpg"}
    ];

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen("3000", function(){
    console.log("YelpCamp served stated at port 3000");
});