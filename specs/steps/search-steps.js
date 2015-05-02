var data = require( "../../lib/data" );

module.exports = function() {

this.World = new (require( "../support/world.js" ))().World;

this.Around = require( "../support/around_hooks" );

this.Given( /^An opinionation named "([^"]*)"$/, function ( oname, callback ) {

	data.add(
		"Roofus",
		"Ad Stellas - Roofus Gibonicus",
		function( err, added ) {

			if( err ) { throw err; }
			this.added = added;
			callback();

		}.bind( this )
	);

} );

this.When( /^I search for "([^"]*)" on the search page$/, function ( oname, callback ) {

	this.visit( "http://localhost:3000/search", function( searchText ) {

		this.evaluate( function( searchText ) {

			document.querySelector( "input[search]" ).value = searchText;
			document.querySelector( "form" ).submit();

		}, function( err ) {

			callback.fail( err );

		}.bind( this ), oname );

	}.bind( this ) );

} );

this.Then(/^I should find a link on text "([^"]*)"$/, function (arg1, callback) {
  // Write code here that turns the phrase above into concrete actions
  callback.pending();
});


};