var mongoose = require("mongoose");


//campground schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

//model from schema
var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
