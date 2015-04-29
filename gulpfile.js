"use strict";
var gulp = require( "gulp" );
var cucumber = require( "gulp-cucumber" );
var watch = require( "gulp-watch" );
var server = require( 'gulp-develop-server' );
var cukes = require( "gulp-cukes" );

gulp.task( "cukes", function( done ) {

	return gulp.src( "specs/**/*.feature", { read: false } ).pipe(
		cukes().format("pretty")
			.withDiagnostics()

	);

} );


gulp.task( "test", [ "server:start", "cukes" ] );

gulp.task( "server:start", function() {

	server.listen( { path: "./index.js" } );

} );

gulp.task( "watch", [ "server:start" ], function() {

	watch( [ "lib/**/*", "specs/**/*" ], function() {

		server.restart( function() {

			setTimeout( function() { gulp.start( "cukes" ); }, 500 );

		} );

	} );

} );
