
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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
app.get('/users', user.list);

/*  ~~~~~~~~~~~~~~~~
	 TEMPORARY PAGE 
	~~~~~~~~~~~~~~~~~	*/
app.get('/', function(req,res) { res.render('home.jade'); });

/*  ~~~~~~~~~~~~~
	 ACTUAL PAGE 
	~~~~~~~~~~~~~~	*/
// home
app.get('/dev/', function(req, res) { res.redirect('/dev/home'); });
app.get('/dev',  function(req, res) { res.redirect('/dev/home'); })

app.get('/dev/home', function(req,res) { 
	res.render('full/home.jade'); 
});

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
	res.render('full/home.jade');
});

// framing
app.get('/dev/frames', function(req,res) {
	res.render('full/home.jade');
});

// contact
app.get('/dev/contact', function(req,res) {
	res.render('full/home.jade');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
