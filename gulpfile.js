const gulp = require('gulp')
const gulpPug = require('gulp-pug')
const gulpClean = require('gulp-clean')
const gulpPlumber = require('gulp-plumber')

gulp.task('task:clean', () => {
   return gulp.src('email')
    .pipe(gulpClean()) 
})

gulp.task('task:pug', () => {
    return gulp.src('src/pug/template/*.pug')
        .pipe(gulpPlumber())
        .pipe(gulpPug({
            pretty: '\t',
            compileDebug: true
        }))
        .pipe(gulp.dest('./email/'))
})