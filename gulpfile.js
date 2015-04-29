"use strict";
var gulp = require( "gulp" );
var cucumber = require( "gulp-cucumber" );
var watch = require( "gulp-watch" );
var server = require( 'gulp-develop-server' );

gulp.task( "cukes", function( done ) {

	return gulp.src( "specs/**/*.feature" ).pipe( cucumber( {

		"steps" : "specs/steps/**/*.js,support/*_hooks.js",
		"format" : "pretty"

	} ) );

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
