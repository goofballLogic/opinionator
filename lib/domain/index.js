"use strict";

function Domain() {

	this.userMessages = [];

}
Domain.prototype.renderResponse = function( responseid, callback ) {

	this.send( "queries.find-response", responseid, function( err, resp ) {

		if( err ) { return callback( resp ); }
		resp.messages = this.userMessages;
		this.userMessages = [];
		callback( null, resp );

	}.bind( this ) );

};
Domain.prototype.updateResponse = function( responseid, payload, callback ) {

	this.send( "commands.update-response", responseid, payload, callback );

};
Domain.prototype.receiveUserMessage = function( subject, message ) {

	this.userMessages.push( new Date() + " " + message );

};
Domain.prototype.receiveUserMessage.receive = [ "user.message" ];

var bus = new ( require( "microbus" ) ).Bus();
bus.connect( require( "./queries" ) );
bus.connect( require( "./commands" ) );
var domain = new Domain();
bus.connect( domain );

module.exports = domain;
