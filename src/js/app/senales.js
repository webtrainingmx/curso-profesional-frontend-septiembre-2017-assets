(function( $ ) {

	// JavaScript namespace
	var components = window.components || {};
	var $componentContent = $( '#js-content' );

	components.signalsComponent = {};

	var signalsComponent = (function() {
		var templateURL = '/src/templates/signals.hbs';
		var serviceURL = 'http://projects-api.webtraining.zone:4000/traffic-signals/v1/signals';
		var compiledTemplate = null;

		function init() {

			$.when.apply( $, [
				getAJAXDataByURL( templateURL ),
				getAJAXDataByURL( serviceURL ),
			] ).then( function( responseSourceTemplate, responseData ) {

				var source = responseSourceTemplate[ 0 ];
				var data = responseData[ 0 ];

				// Compile template
				compiledTemplate = Handlebars.compile( source );


				components.signalsComponent.originalSignals = data.signals;

				// Render to DOM
				renderSignals( components.signalsComponent.originalSignals );

				// Activate filter
				createFilter();
			} );
		}

		function getAJAXDataByURL( url ) {
			// Promises A+
			return $.ajax( url );
		}

		function renderSignals( signals ) {

			var html = compiledTemplate( { signals: signals } );
			$componentContent.html( html );
		}

		function filterSignals( searchTerm ) {
			if ( searchTerm === '' ) return components.signalsComponent.originalSignals;

			return components.signalsComponent.originalSignals.filter( function( signal ) {
				return signal.name.toLowerCase().indexOf( searchTerm ) >= 0;
			} );
		}

		function createFilter() {

			var $items = $componentContent.find( 'div.b-signal' );
			$( '#js-filter' ).keyup( function( e ) {

				var $this = $( this );

				var searchTerm = $this.val().toLowerCase();

				var filteredSignals = filterSignals( searchTerm );
				renderSignals( filteredSignals );

			} );
		}

		return {
			init: init
		};
	})();

	signalsComponent.init();

})( jQuery );