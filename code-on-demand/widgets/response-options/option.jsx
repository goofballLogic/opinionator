var React = require( "react" );

var OptionClass = React.createClass( {

	getInitialState: function() {

		return {};

	},
	handleClick: function( e ) {

		this.setState( {

			bgcolor: this.state.bgcolor ? undefined : "blue"

		} );
		e.stopPropagation();

	},
	render: function() {

		var option = this.props.option;
		var style = {};
		if( this.state.bgcolor ) style.backgroundColor = this.state.bgcolor;

		return <li style={style} onClick={this.handleClick}>
			<span>{option.text}</span>
			<input type="text" defaultValue={option.order} name={option.value} />
		</li>;

	}

} );
module.exports = OptionClass;
