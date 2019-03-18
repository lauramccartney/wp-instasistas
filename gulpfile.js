var gulp = require('gulp'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename'),
		sass = require('gulp-ruby-sass'),
		minifycss = require('gulp-clean-css'),
		notify = require('gulp-notify'),
		autoprefixer = require('gulp-autoprefixer'),
		watch = require('gulp-watch'),
		imagemin = require('gulp-imagemin'),
		cache = require('gulp-cache');

var currentTheme = 'instasistas';
var themePath = `./wp-content/themes/${currentTheme}`;
var jsPath = `${themePath}/static/js/*.js`;
var sassCompilePath = `${themePath}/static/scss/app.scss`;
var sassWatchPath = `${themePath}/static/scss/**/*.scss`;
var imgPath = `${themePath}/static/images/*/**`;

gulp.task('scripts', function() {
    return gulp.src([
			jsPath
    ])
    .pipe(concat('site.js'))
    .pipe(uglify())
    .pipe(gulp.dest(`${themePath}/static`))
		.pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('styles', function() {
	return sass([
		sassCompilePath
	])
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(rename('style.css'))
	.pipe(minifycss())
	.pipe(gulp.dest(themePath))
	.pipe(notify({ message: 'Styles task complete' }));
});


gulp.task('images', function() {
	return gulp.src(imgPath)
	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	.pipe(gulp.dest(imgPath))
	.pipe(notify({ message: 'Images task complete' }));
});


gulp.task('watch', function(done) {

	watch(sassWatchPath, gulp.parallel(['styles']));

	watch(jsPath, gulp.parallel(['scripts']));

	done();
});


gulp.task('default', gulp.series(['scripts', 'styles', 'images', 'watch'],
function(done) {
	done();
}));
