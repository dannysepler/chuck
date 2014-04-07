
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
				// this is where you change which port it runs off of
				// to run it on DigitalOcean, run:
				//		"PORT=80 node app.js"

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*  
	~~~~~~~~~~~~~~~~
	 TEMPORARY PAGE 
	~~~~~~~~~~~~~~~~~	
						*/

app.get('/', function(req,res) { res.render('temp/home.jade'); });

/*  
	~~~~~~~~~~~~~
	 ACTUAL PAGE 
	~~~~~~~~~~~~~~	
					*/

/* 	
	DATABASE ESSENTIALS
						*/

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

/* 
		VIEWS
					*/

app.get('/userlist', routes.userlist(db));
app.get('/newuser', routes.newuser);
app.post('/adduser', routes.adduser(db));


// incorporated to ours
app.get('/newalbum', routes.newalbum);
app.post('/addalbum', routes.addalbum(db));

// home
app.get('/dev/', function(req, res) { res.redirect('/dev/home'); });
app.get('/dev',  function(req, res) { res.redirect('/dev/home'); })

app.get('/dev/home', routes.home(db));

//app.get('/dev/home', function(req,res) { 
//	res.render('full/home.jade'); 
//});

// albums
app.get('/dev/album1', function(req,res) {
	res.render('full/albums/1.jade');
});

app.get('/dev/album2', function(req,res) {
	res.render('full/albums/1.jade');
});

app.get('/dev/album3', function(req,res) {
	res.render('full/albums/1.jade');
});

// for sale
app.get('/dev/forsale', function(req,res) {
	res.render('full/albums/1.jade');
});

// framing
app.get('/dev/frames', function(req,res) {
	res.render('full/frames.jade');
});

// contact
app.get('/dev/contact', function(req,res) {
	res.render('full/contact.jade');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
