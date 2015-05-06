/*eslint-env browser*/
(function() {
	"use strict";

	window.addEventListener( "load", function() {

		( function() {
			var sortables = document.querySelectorAll( "ol li" );
			function markDragger( e ) {

				e.target.dataset.dragmark = "dragger";

			}
			for(var i = 0; i < sortables.length; i++) {

				sortables[ i ].classList.add( "draggable" );
				sortables[ i ].draggable = true;
				sortables[ i ].ondragstart = markDragger;

			}

		}() );
		( function() {

			var dropables = document.querySelectorAll( "ol" );
			function preventDefault( e ) {

				e.preventDefault();

			}
			function handleDrop( e ) {

				e.preventDefault();
				var dragger = document.querySelector( "[data-dragmark=dragger]" );
				dragger.dataset.dragmark = null;
				e.currentTarget.appendChild( dragger );

			}
			for( var i = 0; i < dropables.length; i++ ) {

				dropables[ i ].ondragover = preventDefault;
				dropables[ i ].ondrop = handleDrop;

			}

		}() );
		( function() {


			document.addEventListener( "drop", function() {

				var sortables = document.querySelectorAll( "ol li select" );
				for(var i = 0; i < sortables.length; i++) {

					sortables[ i ].selectedIndex = i;

				}

			} );

		}() );

	} );

}());
