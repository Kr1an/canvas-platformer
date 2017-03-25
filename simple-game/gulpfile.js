'use strict';

var gulp = require("gulp"),
    del = require('del'),
    sass = require('gulp-sass'),
    scssLint = require('gulp-scss-lint'),
    scssLintStylish = require('gulp-scss-lint-stylish'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch');
   

gulp.task("styles", function(){
  return gulp.src("src/scss/main.scss")
    .pipe(scssLint({ customReport: scssLintStylish }))
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(rename({
        basename: "main",
        suffix: ".min"
      }))
      .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("src/css/"))
});
gulp.task('clean', function(cb) {
  return del(['style'], cb);
});
gulp.task('watch', function() {
  gulp.watch('src/scss/**',
  ['styles', 'fonts']);
});
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'fonts', 'watch');
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src([
                    'src/scss/fonts/*.*'])
            .pipe(gulp.dest('src/css/fonts/'));
});
