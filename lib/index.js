"use strict";
var Hapi = require( "hapi" );
var config = require( "../config" );
var Negotiator = require( "negotiator" );
var boom = require( "boom" );
var domain = require( "./domain" );
var server = new Hapi.Server();
var react = require( "react" );

require("node-jsx").install( { extension: ".jsx" } );

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

function renderResponse( statusCode, request, reply ) {

	var rid = request.params.rid;
	domain.renderResponse( rid, function( err, viewmodel ) {

		if( err ) { return reply( boom.badImplementation( err ) ); }
		negotiateReply( request, reply, {

			HTML: function() {
				var fac = react.createFactory( require( "../code-on-demand/widgets/response-options/" ) );
				var ele = fac( viewmodel );
				viewmodel.widgets = {
					response: {
						url: ( viewmodel.baseurl || "" ) + "/public/js/widgets/response-options/browser.js",
						html: react.renderToString( ele ),
						json: JSON.stringify( viewmodel )
					}
				};
				reply.view( "response", viewmodel ).code( statusCode );

			}

		} );

	} );

}

server.route( {

	method: "GET",
	path: "/response/{rid}",
	handler: renderResponse.bind( this, 200 )

} );

server.route( {

	method: "POST",
	path: "/response/{rid}",
	handler: function( request, reply ) {

		var rid = request.params.rid;
		domain.updateResponse( rid, request.payload, function( err ) {

			if( err ) { return reply( boom.badImplementation( err ) ); }
			renderResponse( 201, request, reply );

		} );

	}

} );

server.route( {

	method: "GET",
	path: "/public/{param*}",
	handler: {

		directory: { path: "public" }

	}

} );

server.start( function() {

	console.log( "Server running: ", server.info );

} );
