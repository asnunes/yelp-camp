var express       = require("express"),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local'),
    Campground    = require('./models/campgrounds'),
    Comment       = require("./models/comment"),
    User          = require('./models/user'),
    seedDB        = require("./seed"),
    app           = express();

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //to avoid .ejs at the end of the file
app.use(express.static(__dirname + "/public"))

seedDB();

//passport configuration
app.use(require("express-session")({
    secret: "you spoiled it",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(userInfo); //a middleware function call in every request


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
    res.render("landing");
});
   
//campgrounds routes
app.get("/campgrounds", function(req, res){
    //retrive campground from database
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res){
    //gets comments from id and attach it to foundCampground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
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

//comments routes
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground})
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
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

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");    
}

function userInfo(req, res, next){
    res.locals.currentUser = req.user; //set user info to be used next
    next();
}

//show register form
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
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
app.get("/login", function(req, res){
    res.render("login");
});

var redirects = {successRedirect: "campgrounds", failureRedirect: "login"};

app.post("/login", passport.authenticate("local", redirects), function(req, res){
});

//logout
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

//starts server
app.listen("3000", function(){
        console.log("YelpCamp served stated at port 3000");
    });