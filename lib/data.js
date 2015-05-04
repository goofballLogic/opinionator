"use strict";
var redis = require( "redis" );
var uuid = require( "./uuid" );

module.exports = {

	// add an opinionation with a name and description
	addOp: addOpinionation,
	// update an opinionation with some field content
	update: updateKeyValue,
	// add a response link for a user and opinionation
	addRespLink: addResponseLinkForUser,
	// get response details
	findRespLink: findResponseLink,
	// get opinionation details
	findOp: findOpinionation

};

function hmset( id, o, callback ) {

	var client = redis.createClient();
	client.hmset( id, o, function( err ) {

		client.quit();
		if( err ) { return callback( err ); }
		callback( null, o );

	} );

}

function hgetall( id, callback ) {

	var client = redis.createClient();
	client.hgetall( id, function( err, all ) {

		client.quit();
		if( err ) { return callback( err ); }
		callback( null, all );

	} );

}


function addResponseLinkForUser( id, uid, callback ) {

	var linkid = "rl-" + uuid().replace( /-/g, "" );
	hmset( linkid, {

		"oid": id,
		"uid": uid,
		"linkid": linkid

	}, callback );

}

function updateKeyValue( id, key, value, callback ) {

	var x = { };
	x[ key ] = value;
	hmset( id, x, callback );

}

function addOpinionation( name, description, callback ) {

	var o = {

		"id": uuid(),
		"name": name,
		"description": description

	};
	var id = o.id;
	hmset( id, o, callback );

}

function findResponseLink( linkid, callback ) {

	hgetall( "rl-" + linkid, callback );

}

function findOpinionation( id, callback ) {

	hgetall( id, callback );

}
