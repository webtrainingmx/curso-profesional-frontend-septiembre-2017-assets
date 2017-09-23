// CommonJS: Módulo de Node.js
const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const rename = require( 'gulp-rename' );
const sourcemaps = require( 'gulp-sourcemaps' );
const cleanCSS = require( 'gulp-clean-css' );
const watch = require( 'gulp-watch' );
const util = require( 'util' );

gulp.task( 'sass', () => {
	return gulp.src( './src/scss/main.scss' )
	// .pipe( sourcemaps.init() )
		.pipe( sass().on( 'error', sass.logError ) )
		// .pipe( rename( 'all-styles.css' ) )
		// .pipe( sourcemaps.write() )
		.pipe( gulp.dest( './dist/css' ) );
} );

gulp.task( 'watch', () => {
	watch( './src/scss/**/*.scss', ( file ) => {
		util.log( 'SCSS file changed: ', file.path );
		gulp.start( 'sass', function() {

		} ).on( 'error', ( error ) => {
			util.log( util.colors.red( 'Error' ), error.message );
		} );
	} );
} );

gulp.task( 'build', [ 'sass' ] );
gulp.task( 'default', [ 'sass', 'watch' ] );