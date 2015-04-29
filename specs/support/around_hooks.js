
module.exports = function() {
  this.Around( function( runScenario ) {

      this.openBrowser( function() {

        runScenario( function( callback ) {
          this.closeBrowser();
          callback();
        } );
      } );

  } );

};

