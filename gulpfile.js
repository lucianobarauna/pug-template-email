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
    // return gulp.src('./src/pug/template/*.pug')
    return gulp.src('./src/pug/template/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: '\t',
            compileDebug: true
        }))
        .pipe(gulp.dest('./src/html'))

        .pipe(browserSync.reload({stream: true}))
})


gulp.task('reloadTeste', ['task:pug'], function (done) {
    setTimeout(() => {
        browserSync.reload();
    done();
    }, 500)
    
        
});

// Static server
gulp.task('task:server', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./src/pug/template/*.pug", ['reloadTeste']);
});
