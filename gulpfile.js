const gulp = require('gulp')
const pug = require('gulp-pug')
const clean = require('gulp-clean')
const plumber = require('gulp-plumber')
const browserSync = require('browser-sync')
const imagemin = require('gulp-imagemin')

gulp.task('task:clean', () => {
  return gulp.src('email')
  .pipe(clean())
})

gulp.task('task:pug', () => {
  return gulp.src('./src/pug/template/*.pug')
    .pipe(plumber())
    .pipe(pug({
        pretty: '\t',
        compileDebug: true
    }))
    .pipe(gulp.dest('./email/'))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('task:img', () => {
  return gulp.src('./src/img/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('./email/'))
})

// Static server
gulp.task('task:server', () => {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch("src/pug/template/*.pug", ['task:pug']);
  gulp.watch("src/img/*.jpg", ['task:img']);
  gulp.watch("email/*.html").on("change", browserSync.reload);
});

gulp.task("task:build", ['task:clean'], () => {
  gulp.start('task:pug', 'task:img', 'task:server')
})

