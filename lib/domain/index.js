"use strict";
var bus = new ( require( "microbus" ) ).Bus();
bus.connect( require( "./queries" ) );

function Domain() {}
module.exports = Domain;
Domain.prototype.renderResponse = function( responseid, callback ) {

	bus.send( "queries.find-response", responseid, callback );

};
