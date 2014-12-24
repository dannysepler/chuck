
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes'); // this links to './routes/index.js'
var user = require('./routes/user'); //   links to './routes/user.js'
var prod = require('./routes/prod'); //   links to './routes/prod.js'
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

//app.get('/', function(req,res) { res.render('temp/home.jade'); });
// shouldn't be used
/*  
	~~~~~~~~~~~~~
	 ACTUAL PAGE 
	~~~~~~~~~~~~~~	
					*/


/* --------------------
      PRODUCTION
    -------------------- */

// home
app.get('/', function(req, res) { res.redirect('/home'); });
app.get('/home', prod.home());

// albums
app.get('/albums/birds', prod.albums_birds());
app.get('/albums/critters', prod.albums_critters());
app.get('/albums/bigger_than_critters', prod.albums_bigger_than_critters());
app.get('/albums/landscapes', prod.albums_landscapes());
app.get('/albums/other', prod.albums_other_stuff());
app.get('/albums/more', prod.albums_more());

// page-specific
app.get('/forsale', prod.forsale());
app.get('/frames', prod.frames());
app.get('/contact', prod.contact());





/* 	
	DATABASE ESSENTIALS
						*/
/*
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');


/* CONNECT MONGOCLIENT */
/*MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(err) { return console.dir(err); }

  var collection = db.collection('test');
});


// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/nodetest1');

/* --------------------
        DEVELOPMENT
    -------------------- */


/* 
		VIEWS
					*/

/*app.get('/userlist', routes.userlist(db));
app.get('/newuser', routes.newuser);
app.post('/adduser', routes.adduser(db));

// incorporated to ours
app.get('/albumlist', routes.albumlist(db))
app.get('/newalbum', routes.newalbum);
app.post('/addalbum', routes.addalbum(db));

// home
app.get('/dev/', function(req, res) { res.redirect('/dev/home'); });
app.get('/dev',  function(req, res) { res.redirect('/dev/home'); })
app.get('/dev/home', routes.home(db));

// album views
app.get('/dev/album1', routes.standardalbum(db));

	//	FOR FUTURE: get this to route cleanly, like...
	//	app.get('/dev/albums/:albumname', routes.show(db));


app.get('/dev/albums/:albumname', function(req, res) {
  var links = db.get('links');
  links.find({'albumname': req.params.albumname}, {}, ( function(error, docs) {
      res.render('full/albums/individual', {
        "info" : docs[0],
        "links": links
      })
    })
  )
})

app.get('/dev/albuminfo/:albumname', function(req, res) {
  var links = db.get('links');
  links.find({'albumname': req.params.albumname}, ( function(error, docs) {
      res.send(docs);
    })
  )
});

app.get('/delete/:albumname', function(req, res) {
  //var links = db.get('links');
  /*
  links.find({'albumname': req.params.albumname}, ( function(error, docs) {
      docs.remove( function ( err, docs ) {
        if( err ) return next( err );
      })
    })
  )
  */
  /*MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(err) { return console.dir(err); }

  var collection = db.collection('test');
});
})

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    THE IMAGE UPLOADING STUFF
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/*
var fs = require('fs');
var im = require('imagemagick');

var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/tutorial2/upload' enctype='multipart/form-data'>" +
"<input type='file' name='image'/>" +
"<input type='submit' /></form>" +
"</body></html>";

app.get('/tutorial2/', function (req, res){
	res.writeHead(200, {'Content-Type': 'text/html' });
	res.end(form);

});

/// Include the node file module

/// Post files
app.post('/tutorial2/upload', function(req, res) {

	fs.readFile(req.files.image.path, function (err, data) {

		var imageName = req.files.image.name
		console.log(imageName);

		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.redirect("/tutorial2/");
			res.end();

		} else {

		  var newPath = __dirname + "/public/images/tutorial2/" + imageName;

		  /// write file to uploads/fullsize folder
		  fs.writeFile(newPath, data, function (err) {
		  	console.log('wrote file at '+newPath);
		  	console.log('__dirname is '+__dirname);
		  	/// let's see it
		  	res.redirect("/tutorial2/images/" + imageName);

		  });
		}
	});
});

/// Show files
app.get('/tutorial2/images/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/public/images/tutorial2/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');
});

// for sale
app.get('/dev/forsale', routes.standardalbum(db));

// framing
app.get('/dev/frames', routes.frames(db));

// contact
app.get('/dev/contact', routes.contact(db));


/* OTHER THINGS */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
