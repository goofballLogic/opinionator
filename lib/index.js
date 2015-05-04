"use strict";
var Hapi = require( "hapi" );
var config = require( "../config" );
var Negotiator = require( "negotiator" );
var boom = require( "boom" );
var Domain = require( "./domain" );
var domain = new Domain();
var server = new Hapi.Server();
server.views( {

	engines: { "html": {

		module: require( "hapi-mustache" ),
		layout: true

	} },
	relativeTo: __dirname,
	path: "./templates",
	layoutPath: "./templates/layout"

} );
server.connection( { port: config.port } );

var accepts = {

	HTML: "text/html",
	JSON: "application/json"

};

function negotiateReply( request, reply, accepters ) {

	var parsed = Object.keys( accepters ).reduce( function( o, key ) {

		o[ accepts[ key ] || key ] = accepters[ key ];
		return o;

	}, { } );
	var acceptable = Object.keys( parsed );
	var n = new Negotiator( request );
	var selected = n.mediaTypes( acceptable )[ 0 ];
	if( !selected ) { return reply( boom.notAcceptable( "Acceptable: " + acceptable.join( "; " ) ) ); }
	parsed[ selected ]();

}

server.route( {

	method: "GET",
	path: "/",
	handler: function( request, reply ) {

		negotiateReply( request, reply, {

			HTML: function() {

				reply.view( "index", { title: "The opinionator"} );

			}

		} );

	}

} );

server.route( {

	method: "GET",
	path: "/response/{rid}",
	handler: function( request, reply ) {

		var rid = request.params.rid;
		domain.renderResponse( rid, function( err, viewmodel ) {

			if( err ) { return reply( boom.badImplementation( err ) ); }
			negotiateReply( request, reply, {

				HTML: function() {

					reply.view( "response", viewmodel );

				}

			} );

		} );

	}

} );

server.start( function() {

	console.log( "Server running: ", server.info );

} );
