
var phantom = require( "phantom" );
var around_hooks = require( "./around_hooks" );

module.exports = function() {

	this.World = function World( callback ) {

		this.visit = function( url, callback ) {

			this.page.open( url, function( status ) {

				this.lastStatus = status;
				callback();

			}.bind( this ) );

 		};
 		this.evaluate = function( func, callback ) {


 			var err = null;
 			this.page.set( "onError", function( msg, trace ) {

 				err = [ msg, trace ];

 			} );
 			var args = Array.prototype.slice.call( arguments, 0 );
 			args[ 1 ] = function( result ) {

 				if( err ) return callback( err );
 				callback( null, result );

 			};
 			this.page.evaluate.apply( this, args );

 		};
 		this.openBrowser = function( callback ) {

 			phantom.create( function( browser ) {

 				this.browser = browser;
 				browser.createPage( function( page ) {

 					this.page = page;
	 				callback();

 				}.bind( this ) );

 			}.bind( this ) );

 		};
 		this.closeBrowser = function() {

 			this.browser.exit();
 			this.browser = null;
 			this.page = null;

 		}

 		callback();
	};

}