// CommonJS: Módulo de Node.js
const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const rename = require( 'gulp-rename' );
const sourcemaps = require( 'gulp-sourcemaps' );
const cleanCSS = require( 'gulp-clean-css' );
const watch = require( 'gulp-watch' );
const util = require( 'util' );
const fileinclude = require( 'gulp-file-include' );
const uglify = require( 'gulp-uglify' );
const concat = require( 'gulp-concat' );

gulp.task( 'sass', () => {
	return gulp.src( './src/scss/main.scss' )
	// .pipe( sourcemaps.init() )
		.pipe( sass().on( 'error', sass.logError ) )
		// .pipe( rename( 'all-styles.css' ) )
		// .pipe( sourcemaps.write() )
		.pipe( gulp.dest( './dist/css' ) );
} );

const jsDir = './src/js/app/';

gulp.task( 'minify-js', () => {
	return gulp.src( [
		jsDir + 'navigation.js',
		jsDir + 'senales.js',
	] ).pipe( concat( 'all-scripts.js' ) )
		.pipe( gulp.dest( './dist/js' ) )
		.pipe( rename( 'all-scripts.min.js' ) )
		.pipe( uglify() )
		.pipe( gulp.dest( './dist/js' ) );
} );

gulp.task( 'watch', () => {
	watch( './src/scss/**/*.scss', ( file ) => {
		util.log( 'SCSS file changed: ', file.path );
		gulp.start( 'sass', function() {

		} ).on( 'error', ( error ) => {
			util.log( util.colors.red( 'Error' ), error.message );
		} );
	} );


	// Watch for changes in pages
	watch( './src/pages/**/*.html', ( file ) => {
		util.log( 'Include HTML file changed: ', file.path );
		gulp.start( 'file-include', function() {

		} ).on( 'error', ( error ) => {
			util.log( util.colors.red( 'Error' ), error.message );
		} );
	} );

} );

// Task to generate static pages from a template
gulp.task( 'file-include', () => {
	gulp.src( [ './src/pages/wrappers/*.include.html' ] )
		.pipe( fileinclude( {
			prefix: '@@',
			basepath: '@file'
		} ) )
		.pipe( rename( ( path ) => {
			path.dirname += '/';
			path.basename = path.basename.replace( ".include", "" );
			path.extname = ".html";
		} ) )
		.pipe( gulp.dest( './dist/pages' ) );
} );

// Copy static assets
gulp.task( 'copy-assets', () => {
	return gulp.src( './src/img/*.png' )
		.pipe( gulp.dest( './dist/img' ) );
} );

gulp.task( 'build', [ 'file-include', 'sass' ] );
gulp.task( 'default', [ 'watch', 'build' ] );