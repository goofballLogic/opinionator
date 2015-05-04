"use strict";
var data = require( "../data" );
var config = require( "../../config" );
function Builder() { }
module.exports = Builder;
Builder.prototype.buildResponseLinkForUser = function( user, opinionationId, callback ) {

	if( !opinionationId ) { return callback( new Error( "No opinionationId specified" ) ); }
	var uid = user.id;
	if( !uid ) { return callback( new Error( "No user id specified e.g. { id: 1234 }" ) ); }
	data.addRespLink( opinionationId, uid, function( err, link ) {

		if( err ) { return callback( err ); }
		callback( null, config.root + "/response/" + link.linkid.substr( 3, 100 ) );

	} );

};
Builder.prototype.buildResponseLinkForUser.receive = [ "commands.add-responder" ];
