/*eslint-env node*/
"use strict";
var data = require( "../data" );
function Queries() { }
Queries.prototype.findResponse = function( subject, rid, callback ) {

	function parseOptions( options ) {

		var raw = JSON.parse( options );
		raw.forEach( function( option ) {

			option.text = ( new Date( option.value ) ).toDateString();

		} );
		return raw;

	}

	function opAndLinkDataLoaded( rdata, opData ) {

		callback( null, {

			"title": opData.name,
			"description": opData.description,
			"options": parseOptions( opData.options )

		} );

	}

	function responseLinkLoaded( rdata ) {

		var oid = rdata.oid;
		data.findOp( oid, function( err, opData ) {

			if( err ) { return callback( err ); }
			opAndLinkDataLoaded( rdata, opData );

		} );

	}

	data.findRespLink( rid, function( err, responseData ) {

		if( err ) { return callback( err ); }
		responseLinkLoaded( responseData );

	} );

};
Queries.prototype.findResponse.receive = [ "queries.find-response" ];
module.exports = new Queries();
