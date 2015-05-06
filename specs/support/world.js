"use strict";
var phantom = require( "phantom" );

module.exports = function() {

	this.World = function World( complete ) {

		this.visit = function( url, callback ) {

			this.page.open( url, function() { callback(); } );

		};
		this.evaluate = function( func, callback ) {


			var err = null;
			this.page.set( "onError", function( msg, trace ) {

				this.page.set( "onError", null );
				err = [ msg, trace ];

			}.bind( this ) );
			var args = Array.prototype.slice.call( arguments, 0 );
			args[ 1 ] = function( result ) {

				if( err ) { return callback( err ); }
				callback( null, result );

			};
			this.page.evaluate.apply( this, args );

		};
		this.awaitLoad = function( func, callback ) {

			this.page.set( "onLoadFinished", function( response ) {

				this.page.set( "onLoadFinished", null );
				callback( response );

			}.bind( this ) );
			func.call( this );

		};
		this.openBrowser = function( callback ) {

			phantom.create( function( browser ) {

				this.browser = browser;
				browser.createPage( function( page ) {

					this.page = page;
					this.page.set( "onResourceReceived", function( resp ) {

						this.lastResponse = JSON.parse( JSON.stringify( resp ) );

					}.bind( this ) );
					callback();

				}.bind( this ) );

			}.bind( this ) );

		};
		this.closeBrowser = function() {

			this.browser.exit();
			this.browser = null;
			this.page = null;

		};

		complete();
	};

};
