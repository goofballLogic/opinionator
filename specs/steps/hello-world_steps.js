var should = require( "chai" ).should();

module.exports = function() {

	this.World = new (require( "../support/world.js" ))().World;

	this.Around = require( "../support/around_hooks" );

	this.Given(/^I am on the home page$/, function ( callback ) {

		this.visit( "http://localhost:3000/", callback );

	} );

	this.When(/^I fetch the body text$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		this.evaluate( function() { return window.document.body.textContent; }, function( result ) {

			this.bodyText = result;
			callback();

		}.bind( this ) );

	});

	this.Then(/^I should find "([^"]*)"$/, function (expected, callback) {

		this.bodyText.should.equal( expected );
		callback();

	});

};