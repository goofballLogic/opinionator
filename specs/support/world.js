
var phantom = require( "phantom" );
var around_hooks = require( "./around_hooks" );

module.exports = function() {

	this.World = function World( callback ) {

		this.visit = function( url, callback ) {

			this.page.open( url, function( status ) {

				this.lastStatus = status;
console.log( status );
				callback();

			}.bind( this ) );

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