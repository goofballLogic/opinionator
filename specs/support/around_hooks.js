
module.exports = function() {

	this.Around( function( runScenario ) {

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

