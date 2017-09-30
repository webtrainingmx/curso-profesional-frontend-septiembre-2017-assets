(function( $ ) {
	// Patrón de Notación de Objetos Literal
	// Object Literal Notation (module)

	var navigationComponent = {

		init: function() {
			this.setActiveLinkInNavigation();
		},
		setActiveLinkInNavigation: function() {
			var currentSlug = $( '#js-content' ).data( 'slug' );

			$( '#js-main-navigation' ).find( 'a' ).filter( function( index, navigationLink ) {
				return $( navigationLink ).attr( 'href' ).indexOf( currentSlug ) > 0;
			} ).addClass( 'is-active' );
		}

	};

	navigationComponent.init();

})( jQuery );