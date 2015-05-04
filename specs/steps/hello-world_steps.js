var should = require( "chai" ).should();
var http = require( "http" );
var config = require( "../../config" );

module.exports = function() {

	this.World = new (require( "../support/world.js" ))().World;

	this.Around = require( "../support/around_hooks" );

	this.Given(/^I am on the home page$/, function ( callback ) {

		this.visit( "http://localhost:3000/", callback );

	} );

	this.When(/^I fetch the body text$/, function (callback) {
		// Write code here that turns the phrase above into concrete actions
		this.evaluate( function() { return window.document.body.textContent; }, function( err, result ) {

			this.bodyText = result;
			callback();

		}.bind( this ) );

	});

	this.Then(/^I should find "([^"]*)"$/, function (expected, callback) {

		this.bodyText.should.contain( expected );
		callback();

	});

	this.Given( /^I request the root of the site as JSON$/, function (callback) {

		var opts = { host: "localhost", port: config.port, method: "GET", headers: { "Accept" : "application/json" } }
		var req = http.request( opts, function( res ) {

			this.response = res;
			callback();

		}.bind( this ) );
		req.end();

	});

	this.Then( /^I should receive a (\d+) response$/, function ( statusCode, callback) {

		this.response.statusCode.should.equal( Number( statusCode ) );
		callback();

	} );

};