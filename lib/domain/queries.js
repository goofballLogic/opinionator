/*eslint-env node*/
"use strict";
var data = require( "../data" );
function Queries() { }
Queries.prototype.findResponse = function( subject, rid, callback ) {

	function parseOptions( options, order ) {

		var raw = JSON.parse( options );
		if( order ) { order = order.split( "," ); }
		raw.forEach( function( option, index, count ) {

			option.text = ( new Date( option.value ) ).toDateString();
			option.setting = [];
			for(var i = 0; i < count.length; i++ ) {

				option.setting.push( { text: i + 1, value: i } );

			}
			option.order = order ? order.indexOf( String( option.value ) ) : -1;

		} );
		raw.sort( function( a, b ) {

			return a.order < b.order ? -1 : a.order === b.order ? 0 : 1;

		} );
		raw.forEach( function( option, index ) {

			option.setting[ index ].selected = true;

		} );
		return raw;

	}

	function opAndLinkDataLoaded( rdata, opData ) {

		callback( null, {

			"title": opData.name,
			"description": opData.description,
			"options": parseOptions( opData.options, rdata.order )

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
