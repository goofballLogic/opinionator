"use strict";
/*eslint-disable new-cap*/
/*eslint-env browser*/
var should = require( "chai" ).should();

var data = require( "../../lib/data" );
var Builder = require( "../../lib/domain/builder" );

module.exports = function() {

this.World = new (require( "../support/world.js" ))().World;

this.Around = require( "../support/around_hooks" );

this.Given(/^a new opinionation "([^"]*)"$/, function ( oname, callback) {

  data.addOp( oname, "", function( err, created ) {

    this.created = created;
    callback( err );

  }.bind( this ) );

} );

this.Given(/^it has description "([^"]*)"$/, function ( odesc, callback ) {

  data.update( this.created.id, "description", odesc, callback );

});

function rowsAsDates( table ) {

    return table.raw()
      .map( function( row ) { return row[ 0 ]; } )
      .map( function( datestring ) { return new Date( datestring ); } );

}

this.Given( /^it has date options:$/, function (table, callback) {

  var options = rowsAsDates( table )
    .map( function( date ) { return date.valueOf(); } )
    .map( function( value ) { return { "type": "date", "value": value }; } );

  data.update( this.created.id, "options", JSON.stringify( options ), callback );

} );

this.Given(/^I follow the responder link$/, function ( callback ) {

  var builder = new Builder();
  this.user = { id: "andrew@goofballLogic.com" };
  builder.buildResponseLinkForUser( this.user, this.created.id, function( err, link ) {

    if( err ) { return callback( err ); }
    this.visit( link, function() {

      var status = this.lastResponse.status;
      if( status === 200 ) { return callback(); }
      console.log( this.lastResponse );
      callback.fail( "Expected status code 200 but received: " + status );

    }.bind( this ) );

  }.bind( this ) );

});

function verify( expectation, callback ) {

  return function() {

    try {

      expectation.apply( this, arguments );
      callback();

    } catch( e ) {

      callback.fail( e );

    }

  };

}

this.Then( /^I should see the title "([^"]*)"$/, function ( title, callback ) {

  this.page.evaluate( function() {

    return document.title;

  }, verify( function( actual ) {

      should.exist( actual );
      actual.should.equal( title );

  }, callback ) );

});

this.Then( /^I should see the description "([^"]*)"$/, function ( desc, callback ) {

  this.page.evaluate( function() {

    return document.querySelector( "h2" ).textContent;

  }, verify( function( actual ) {

      should.exist( actual );
      actual.should.equal( desc );

  }, callback ) );

} );

this.Then(/^I should see the (\d+) date options:$/, function ( count, options, callback) {

  this.page.evaluate( function() {

    var ret = [];
    var li = document.querySelectorAll( "li span" );
    for( var i = 0; i < li.length; i++ ) { ret.push( li[ i ].textContent ); }
    return ret;

  }, verify( function( actual ) {

    should.exist( actual );
    actual.length.should.equal( Number( count ) );
    rowsAsDates( options ).forEach( function( date ) {

      actual.should.contain( date.toDateString() );

    } );

  }, callback ) );

});

this.When( /^I set the second item's order to (\d+)$/, function ( newOrder, callback ) {

  this.page.evaluate( function( newIndex ) {

    document.querySelectorAll( "li input" )[ 1 ].value = newIndex;

  }, callback, newOrder );

});

this.When(/^I set the first item's order to (\d+)$/, function ( newOrder, callback) {

  this.page.evaluate( function( newIndex ) {

    document.querySelectorAll( "li input" )[ 0 ].value = newIndex;

  }, callback, newOrder );

});

this.When(/^I submit the form$/, function ( callback ) {

  this.awaitLoad( function() {

    this.page.evaluate( function() {

      document.querySelector( "input[type=\"submit\"]" ).click();

    } );

  }, function( result ) {

    if( result === "success" ) { return callback(); }
    callback.fail();

  } );

});

this.Then(/^I should see a new top item "([^"]*)"$/, function ( expected, callback) {


  this.page.evaluate( function() {

    return document.querySelectorAll( "li span" )[ 0 ].textContent;

  }, verify( function( actual ) {

    actual.should.equal( new Date( expected ).toDateString() );

  }, callback ) );

});

};
