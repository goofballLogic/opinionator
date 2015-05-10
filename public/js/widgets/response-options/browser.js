(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*eslint-env browser*/
var key = "response-options";
var React = window.React;
var opinionator = window.opinionator = window.opinionator || {};
var widgets = opinionator.widgets = opinionator.widgets || {};
if( !widgets.hasOwnProperty( key ) ) {

	var factory = React.createFactory( require( "./index.jsx" ) );
	widgets[ key ] = factory;

}


},{"./index.jsx":2}],2:[function(require,module,exports){
var React = window.React;
var OptionElement = require( "./option.jsx" );

var ResponseOptionsClass = React.createClass( {displayName: "ResponseOptionsClass",

  render: function() {

  	var options = this.props.options || [];
    return React.createElement("ol", {className: "response-options"}, options.map( function( option, index ) {

    	return React.createElement(OptionElement, {option: option, key: index});

    }) );

  }

} );
module.exports = ResponseOptionsClass;


},{"./option.jsx":3}],3:[function(require,module,exports){
var React = window.React;

var OptionClass = React.createClass( {displayName: "OptionClass",

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

		return React.createElement("li", {style: style, onClick: this.handleClick}, 
			React.createElement("span", null, option.text), 
			React.createElement("input", {type: "text", defaultValue: option.order, name: option.value})
		);

	}

} );
module.exports = OptionClass;


},{}]},{},[1])