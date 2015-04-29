var Hapi = require( "hapi" );

var server = new Hapi.Server();
server.connection( { port: 3000 } );

server.route( {

	method: "GET",
	path: "/",
	handler: function( request, reply ) {

		reply( "<HTML><BODY>hello world2</BODY></HTML>" );
	}

} );

server.start( function() {

	console.log( "Server running at: ", server.info );

} );
