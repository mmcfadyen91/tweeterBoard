gulp        = require 'gulp'
gutil       = require 'gulp-util'
livereload  = require 'gulp-livereload'
nodemon     = require 'gulp-nodemon'
watch       = require 'gulp-watch'
jshint      = require 'gulp-jshint'
prefix      = require 'gulp-autoprefixer'
stylus      = require 'gulp-stylus'

param = require './gulpconfig.coffee'

gulp.task 'lint', () ->
  gutil.log gutil.colors.red 'Gulp: linting js'
  gulp.src param.all_js_files, base: './'
  .pipe jshint()
  .pipe jshint.reporter 'default'

gulp.task 'watch', () ->
  gutil.log gutil.colors.magenta 'Gulp: watching stylus:'
  gulp.watch param.styles, ['styles']
  gutil.log gutil.colors.magenta 'Gulp: watching all js files:'
  gulp.watch param.all_js_files, ['lint']

gulp.task 'styles', () ->
  gutil.log gutil.colors.yellow 'Gulp: compiling stylus'
  gulp.src param.styles
  .pipe stylus()
  .pipe prefix()
  .pipe gulp.dest param.dist_css

gulp.task 'nodemon', () ->
  nodemon nodemonSettings
  .on 'change', ['lint']
  .on 'restart', ->
	gutil.log gutil.colors.green 'Gulp: restarted node server.'

nodemonSettings =
  script: 'server.js'
  ext: 'js html'
  env:
    'NODE_ENV': 'development'


gulp.task 'default', ['styles','lint','nodemon','watch']
