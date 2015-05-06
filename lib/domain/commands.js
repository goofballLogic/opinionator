/*eslint-env node*/
"use strict";
var data = require( "../data" );
function Commands() { }
Commands.prototype.updateResponse = function( subject, rid, payload, callback ) {

	var values = Object.keys( payload )
		.map( function( k ) { return [ k, payload[ k ] ]; } )
		.sort( function( a, b ) { return a[ 1 ] < b[ 1 ] ? -1 : a[ 0 ] === b[ 1 ] ? 0 : 1; } )
		.map( function( ki ) { return ki[ 0 ]; } );

	data.updateResp( rid, "order", values, function( err ) {

		if( err ) { return callback( err ); }
		this.send( "user.message", "Order saved" );
		callback();

	}.bind( this ) );

};
Commands.prototype.updateResponse.receive = [ "commands.update-response" ];
module.exports = new Commands();
