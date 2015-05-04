"use strict";
/*eslint-disable new-cap*/
var Microbus = require( "microbus" );
module.exports = function() {

	this.Around( function( runScenario ) {

		this.bus = new Microbus.Bus();

		console.log( "Opening browser" );
		this.openBrowser( function() {

			runScenario( function( callback ) {

				console.log( "Closing browser" );
				this.closeBrowser();
				callback();

			} );

		} );

	} );

};

