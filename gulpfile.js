"use strict";
var gulp = require( "gulp" );
var watch = require( "gulp-watch" );
var server = require( 'gulp-develop-server' );
var cukes = require( "gulp-cukes" );
var http = require( "http" );
var config = require( "./config" );

gulp.task( "cukes", function( done ) {

	return gulp.src( "specs/**/*.feature", { read: false } ).pipe(
		cukes().format("pretty")
			.withDiagnostics()

	);

} );

gulp.task( "server:start", function() {

	server.listen( { path: "./index.js" } );

} );

gulp.task( "test", [ "server:start", "cukes" ] );

function pingServer( next, count ) {

	if( count > 5 ) {

		console.log( "FAILED TO PING SERVER" );
		return;

	}
	var req = http.request( "http://localhost:" + config.port, next );
	req.on( "error", function() {

		console.log( "Delaying until server is up again..." );
		setTimeout( pingServer.bind( this, next, ++count ), 250 );

	} );
	req.end();

}

gulp.task( "watch", [ "server:start" ], function() {

	watch( [ "lib/**/*", "specs/**/*" ], function() {

		server.restart( function() {

			pingServer( function() {

				console.log( "Successfully verified that server is back up." );
				gulp.start( "cukes" );

			} );

		} );

	} );

} );
