var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name : "Cloud's Rest",
        image : "https://res.cloudinary.com/simpleview/image/upload/v1584361003/clients/poconos/Campgrounds_Exterior_Keen_Lake_1_PoconoMtns_d606c492-eb33-450d-a725-e173b70c6cb8.jpg",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name : "Desert Mesa",
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvGc4TnZe_dpu8Oet5TasBjBzn1RtT754V_Ny3Gq3uGqc0SYQv&usqp=CAU",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name : "Canyon Floor",
        image : "https://cincinnatiusa.com/sites/default/files/styles/article_full/public/attractionphotos/Winton%20Woods%20Campground.JPG?itok=Iytm6OhO",
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
]

function seedDb(){
    // Remove all campgrounds
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        // add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                        text : "This place is great",
                        author : "Homer"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            }
                            else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");

                            }
                    });
                }
            });
        });
    });

    
    //add a few comments
}

module.exports = seedDb;

