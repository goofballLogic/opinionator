/*eslint-env browser*/
var key = "response-options";
var React = require( "react" );
var opinionator = window.opinionator = window.opinionator || {};
var widgets = opinionator.widgets = opinionator.widgets || {};
if( !widgets.hasOwnProperty( key ) ) {

	var factory = React.createFactory( require( "./index.jsx" ) );
	widgets[ key ] = factory;

}
