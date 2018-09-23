var mongoose    = require("mongoose"),
    Campgrounds = require("./models/campgrounds"),
    Comment     = require("./models/comment");
  
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

function seedDB(){
    //Remove all campgrounds from db
    Campgrounds.deleteMany({}, campgroundsRemovedCallBack);
};

//inner functions
function createNewCampgrounds(){
    data.forEach(function(campground){
        Campgrounds.create(campground, campgroundsCreatedCallBack);
    });
}

function createNewComment(campground){
    var comment = {text: "Yeah, just listening", author: "Fulano de Tal"};
    Comment.create(comment, function(err, comment){
        if(err){
            console.log(err);
        } else {
            // comment.author.id = 'testid'
            comment.author.username = 'Admin';
            comment.save();

            campground.comments.push(comment);
            campground.save();
            console.log("A comment has been created");
        }
    });
};

//callbacks
function campgroundsCreatedCallBack(err, campground){
    if(err){
        console.log(err);
    } else{
        console.log("a campground has been created");
        createNewComment(campground);
   }

};

function campgroundsRemovedCallBack(err){
    if(err){
        console.log(err);
    } else {
        console.log("All campgrounds have been removed");
        //createNewCampgrounds();
    }
};

module.exports = seedDB;



