const gulp = require('gulp')
const browserSync = require('browser-sync').create()

gulp.task('default', () =>
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
)

gulp.task('reload', done => {
  browserSync.reload()
  done()
})

gulp.watch(['./*.html', './*.css', '*.js'], ['reload'])
