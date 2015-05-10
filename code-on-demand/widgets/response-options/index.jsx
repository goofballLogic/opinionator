var React = require( "react" );
var OptionElement = require( "./option.jsx" );

var ResponseOptionsClass = React.createClass( {

  render: function() {

  	var options = this.props.options || [];
    return <ol className="response-options">{options.map( function( option, index ) {

    	return <OptionElement option={option} key={index} />;

    } ) }</ol>;

  }

} );
module.exports = ResponseOptionsClass;
