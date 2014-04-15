var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

/*  

    ~~~~~~~~~~~~~~~~
     STANDARD VIEWS
    ~~~~~~~~~~~~~~~~ 

                       */

exports.home = function() {
    return function(req, res) {
		res.render('prod/home.jade');
    };
};

exports.frames = function() {
    return function(req, res) {
	    res.render('full/home');
    };
};

exports.contact = function() {
    return function(req, res) {
		res.render('full/home')
    };
};


// ALBUM VIEWS
exports.albums_critters = function() {
    return function(req, res) {
		res.render('prod/albums/critters')
    };
};

exports.albums_landscapes = function() {
    return function(req, res) {
		res.render('prod/albums/landscapes')
    };
};

exports.albums_more = function() {
    return function(req, res) {
		res.render('prod/albums/more')
    };
};