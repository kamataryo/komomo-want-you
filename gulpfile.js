const gulp = require('gulp')
const streamqueue = require('streamqueue')
const less = require('gulp-less')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const minifyCss = require('gulp-minify-css')
const browserSync = require('browser-sync').create()
const runSequence = require('run-sequence')

gulp.task('html', () => {
  return gulp.src('./src/index.html').pipe(gulp.dest('./dist'))
})
gulp.task('assets', () => {
  return gulp.src('./src/assets/*').pipe(gulp.dest('./dist/assets'))
})

gulp.task('css', () => {
  return streamqueue(
    { objectMode: true },
    gulp.src('./src/styles/**/*.css'),
    gulp.src('./src/styles/**/*.less').pipe(less())
  )
    .pipe(concat('style.css'))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('start', ['html', 'assets', 'css'], () =>
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
)

gulp.task('reload', ['html', 'assets', 'css'], done => {
  browserSync.reload()
  return done()
})

gulp.task('default', ['html', 'assets', 'css', 'start'])

gulp.watch(
  [
    './src/styles/**/*.css',
    './src/styles/**/*.less',
    './src/index.html',
    './src/**/*.js'
  ],
  ['reload']
)
