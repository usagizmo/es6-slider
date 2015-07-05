var gulp = require('gulp');

var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');

var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var assign = require('lodash.assign');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

var livereload = require('gulp-livereload');

/**
 * Utilities
 */
var notifyOpts = {
  message: '<%= error.message %>',
  sound: 'Basso'
};
var getBundler = function() {
  return browserify('src/es6/app.js', {
    debug: true
  }).transform(babelify);
};
var bundleJs = function(bundler) {
  return bundler.bundle()
    .on('error', notify.onError(assign({
      title: '<%= error.plugin %>'
    }, notifyOpts)))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('public/js'));
    // .pipe(rename('app.min.js'))
    // .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(uglify({preserveComments: 'some'}))
    // .pipe(sourcemaps.write('./'))
    // .pipe(gulp.dest('public/js'));
};

/**
 * Tasks
 */
gulp.task('less', function() {
  gulp.src('src/less/app.less')
    .pipe(plumber({
      errorHandler: notify.onError(assign({
        title: '<%= error.plugin %>'
      }, notifyOpts))
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(less())
    .pipe(gulp.dest('public/css'))
    .pipe(minifyCss({keepBreaks: true}))
    .pipe(rename('app.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('es6', function() {
  var bundler = getBundler();
  return bundleJs(bundler);
});

gulp.task('watch', function() {
  gulp.watch('src/less/*.less', ['less']);

  // es6
  var bundler = watchify(getBundler());
  bundler.on('update', function() {
    bundleJs(bundler);
  });
  bundler.on('log', function(message) {
    console.log(message);
  });
  bundleJs(bundler);
});

gulp.task('livereload', function() {
  livereload.listen();
  gulp.watch([
    'public/**/*',
  ]).on('change', livereload.changed);
});

gulp.task('default', [
  'less',
  'es6',
  'watch',
  'livereload'
]);
