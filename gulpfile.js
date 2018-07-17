const gulp = require('gulp')
const pug = require('gulp-pug')
const clean = require('gulp-clean')
const plumber = require('gulp-plumber')
const browserSync = require('browser-sync')

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
        .pipe(gulp.dest('./src/html'))
        .pipe(browserSync.stream({match: 'pug/**/*.pug'}));
})

gulp.task('task:pug-watch', ['task:pug'], (done) => {
    browserSync.reload();
    done();
});


// Static server
gulp.task('task:server', () => {
    browserSync.init({
        server: {
            baseDir: "./src/html/"
        }
    });
    gulp.watch("./src/pug/template/*.pug", ['task:pug-watch']);
});