var Hapi = require( "hapi" );
var config = require( "../config" );
var Negotiator = require( "negotiator" );
var boom = require( "boom" );

var server = new Hapi.Server();
server.connection( { port: config.port } );

var MT_HTML = "text/html";
var MT_JSON = "application/json";

server.route( {

	method: "GET",
	path: "/",
	handler: function( request, reply ) {

		var available = [ MT_HTML ]
		var n = new Negotiator( request );
		switch( n.mediaTypes( available )[ 0 ] ) {

			case MT_HTML:
				reply( "<HTML><BODY>hello world</BODY></HTML>" );
				break;
			default:
				reply( boom.notAcceptable( "I've only got HTML" ) );
				break;
		}
	}

} );

server.start( function() {

	console.log( "Server running: ", server.info );

} );