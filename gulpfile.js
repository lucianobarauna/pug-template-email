const gulp = require('gulp')
const pug = require('gulp-pug')
const gulpData = require('gulp-data')
const clean = require('gulp-clean')
const plumber = require('gulp-plumber')
const browserSync = require('browser-sync')
const imagemin = require('gulp-imagemin')
const fs = require('fs');

// Clear folder email
gulp.task('task:clean', () => {
  return gulp.src('email')
  .pipe(clean())
})

// Render Pug
gulp.task('task:pug', () => {
  return gulp.src('./src/pug/template/*.pug')
    .pipe(plumber())
    .pipe(gulpData(() => {
      return JSON.parse(fs.readFileSync('./src/data/news.json'))
    }))
    .pipe(pug({
        pretty: '\t',
        compileDebug: true
    }))
    .pipe(gulp.dest('./email/'))
    .pipe(browserSync.reload({stream: true}))
})

// Copy images to folder email
gulp.task('task:copyimg', () => {
  return gulp.src('./src/img/*.jpg')
    .pipe(gulp.dest('./email/'))
    .pipe(browserSync.reload({stream: true}))
})

// Build image
gulp.task('task:buildimg', () => {
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
  gulp.watch(["src/img/*.jpg", "email/*.html"], ['task:copyimg']);
  gulp.watch("email/*.html").on("change", browserSync.reload);
});


// Build
gulp.task("task:build", ['task:clean'], () => {
  gulp.start('task:pug', 'task:buildimg', 'task:server')
})


