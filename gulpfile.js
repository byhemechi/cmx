var gulp = require('gulp');
var del = require('del');
var webpack = require("webpack-stream");
var util = require('gulp-util');
var nodemon = require('gulp-nodemon');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var nib = require('nib');

var prod = !!util.env.production;

var paths = {
  scripts: ['client/js/**/*.js'],
  styles: ['client/styl/**/*.styl']
};

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('scripts', ['clean'], function() {
  // Run webpack and babel on our client-side scripts
  return gulp.src(paths.scripts)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('build/js/'))
});

gulp.task('styles', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: prod,
      use: nib()
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css/'))
});

// Rerun the task when a file changes
gulp.task('watch', ['scripts', 'styles'], function() {
  console.log(stylus())
  gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: { 'NODE_ENV': prod ? 'production' : 'development' }
  })
})
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'styles']);
