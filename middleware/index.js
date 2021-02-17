var Campground = require("../models/campground");
var Comment = require("../models/comment");


// all middleware goes here


var middlewareObj ={};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
        //is user logged in
        if(req.isAuthenticated()){
                
            Campground.findById(req.params.id,function(err,foundCampground){
                if(err){
                    req.flash("error","Campground not found");
                    res.redirect("back")
                }
                else{
                    //does user own the campground?
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                    }
                    else{
                        req.flash("error","Permission denied");
                        res.redirect("back");
                    }
    //NOTE:---- For the above comparision (foundCampground.author.id & req.user._id), .equals method is used
    //          instead of (foundCampground.author.id===req.user._id) because both the ids are different.
    //          foundCampground.author.id is a mongoose object 
    //          req.user._id is a string
    
        
                }
            });
    
        }else{
            req.flash("error","Please Login First");
            res.redirect("back");
        }
    
    }



middlewareObj.checkCommentOwnership = function(req,res,next){
        //is user logged in
        if(req.isAuthenticated()){
                
            Comment.findById(req.params.comment_id,function(err,foundComment){
                if(err){
                    res.redirect("back")
                }
                else{
                    //does user own the comment?
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    }
                    else{
                        req.flash("error","Permission denied");

                        res.redirect("back");
                    }
    //NOTE:---- For the above comparision (foundCampground.author.id & req.user._id), .equals method is used
    //          instead of (foundCampground.author.id===req.user._id) because both the ids are different.
    //          foundCampground.author.id is a mongoose object 
    //          req.user._id is a string
    
        
                }
            });
    
        }else{
            req.flash("error","Please login first");

            res.redirect("back");
        }
    
}

//middleware
middlewareObj.isLoggedIn =  function(req,res,next) {
	if(req.isAuthenticated()){
		return next();

    }
    req.flash("error","Please Login First");
	res.redirect("/login");
}

module.exports = middlewareObj