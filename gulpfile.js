'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');
 
gulp.task('compile_css', function () {
  return gulp.src('./styles_src/main.scss')
    .pipe(sass({includePaths: ['./styles_src']}).on('error', sass.logError))
    .pipe(autoprefixer({
			browsers: ['> 1%', 'last 2 versions', 'ie >= 8'],
		}))
    .pipe(gulp.dest('./styles'));
});
 
gulp.task('watch', function () {
  gulp.watch('./styles_src/*.s*ss', gulp.series('compile_css'));
});