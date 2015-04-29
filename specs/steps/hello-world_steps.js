module.exports = function() {

	this.World = new (require( "../support/world.js" ))().World;

	this.Around = require( "../support/around_hooks" );

	this.Given(/^I am on the home page$/, function ( callback ) {

console.log( 1234 );
		this.visit( "http://localhost:3000/", callback );

	} );

	this.When(/^I fetch the body text$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

	this.Then(/^I should find "([^"]*)"$/, function (arg1, callback) {
		// Write code here that turns the phrase above into concrete actions
		callback.pending();
	});

};