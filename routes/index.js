var mongo = require('mongodb');
var monk = require('monk');
var Db = monk('localhost:27017/nodetest1');

/*  

    ~~~~~~~~~~~~~~~~
     STANDARD VIEWS
    ~~~~~~~~~~~~~~~~ 

                       */

exports.home = function(db) {
    return function(req, res) {
        var links = db.get('links');
        links.find({},{}, function(e, docs) {
            res.render('full/home.jade', {
                "links" : docs
            });
        });
    };
};

exports.standardalbum = function(db) {
    return function(req, res) {
        var links = db.get('links');
        links.find({},{}, function(e, docs) {
            res.render('full/albums/1.jade', {
                "links" : docs
            });
        });
    };
};

//exports.show = function(req,res,next) {
exports.show = function(db) {
    //var album_name = req.cookies ? req.cookies.album_name : undefined;

    return function(req, res) {
        var links = Db.get('links');
        links.find({},{}, function(e, docs) {
            res.render('full/albums/1.jade', {
                "links" : docs
        //        "name"  : album_name
            });
        });
    };
};

exports.frames = function(db) {
    return function(req, res) {
        var links = db.get('links');
        links.find({},{}, function(e, docs) {
            res.render('full/frames.jade', {
                "links" : docs
            });
        });
    };
};

exports.contact = function(db) {
    return function(req, res) {
        var links = db.get('links');
        links.find({},{}, function(e, docs) {
            res.render('full/contact.jade', {
                "links" : docs
            });
        });
    };
};


/*  

    ~~~~~~~~~~~~~~~~~~~~
    EDITING ALBUMS VIEWS
    ~~~~~~~~~~~~~~~~~~~~~
    

                            */
exports.newalbum = function(req, res){
  res.render('full/data/newalbum', { title: 'Add New Album' });
};

exports.addalbum = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var albumname = req.body.albumname;
        var albumlink = req.body.albumlink;

        // Set our collection
        var links = db.get('links');

        // Submit to the DB
        links.insert({
            "albumname" : albumname,
            "albumlink" : albumlink
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("albumlist");
                // And forward to success page
                res.redirect("dev");
            }
        });

    }
}
//  res.render('full/home.jade'); 



/* THESE ARE EXAMPLES PROVIDED BY THE
MONGO TUTORIAL */

exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.render('full/data/sample', {
                "userlist" : docs
            });
        });
    };
};

exports.newuser = function(req, res){
  res.render('full/data/newuser', { title: 'Add New User' });
};

exports.adduser = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var userName = req.body.username;
        var userEmail = req.body.useremail;

        // Set our collection
        var collection = db.get('usercollection');

        // Submit to the DB
        collection.insert({
            "username" : userName,
            "email" : userEmail
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist");
                // And forward to success page
                res.redirect("userlist");
            }
        });

    }
}