var redis = require( "redis" );

module.exports = {

	// add an opinionation with a name and description
	add: addOpinionation

};

function uuid() {

	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace( /[xy]/g, function( c ) {

	    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    		return v.toString(16);
	} );

}

function addOpinionation( name, description, callback ) {

	var o = {

		"id" : uuid(),
		"name" : name,
		"description" : description

	}
	var client = redis.createClient();
	client.hmset( o.id, o, function( err, res ) {

		client.quit();
		if( err ) return callback( err );
		callback( null, o );

	} );


}