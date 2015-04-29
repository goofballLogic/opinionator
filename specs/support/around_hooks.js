
module.exports = function() {
  this.Around( function( runScenario ) {

console.log( 111 );


      this.openBrowser( function() {

        runScenario( function( callback ) {
          this.closeBrowser();
          callback();
        } );
      } );

  } );

};

