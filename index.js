'use strict';
var favicon = require('serve-favicon');

var kraken = require('kraken-js'),
	db = require('./lib/database'),
	fs = require('fs'),
	app = {}
	;


app.configure = function configure(nconf, next) {

	db.config(nconf.get('databaseConfig'));

	nconf.set('ssl', {
        key:  fs.readFileSync('./ssl/ssl.key'),
        cert: fs.readFileSync('./ssl/ssl.crt'),
        ca: fs.readFileSync('./ssl/sub.class1.server.ca.pem')
    })
	// Async method run on startup.
	next(null);
};


app.requestStart = function requestStart(server) {
	// Run before most express middleware has been registered.
	server.use(favicon(__dirname + '/public/favicon.ico'));
};


app.requestBeforeRoute = function requestBeforeRoute(server) {
	// Run before any routes have been added.
};


app.requestAfterRoute = function requestAfterRoute(server) {
	// Run after all routes have been added.
};

if (require.main === module) {

	kraken.create(app).listen(function (err, server) {
		if (err) {
			console.error(err.stack);
		}
	});
}


module.exports = app;
