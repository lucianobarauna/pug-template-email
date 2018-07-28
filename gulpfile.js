
const config = {
  outName: "html-esppais-2018"
}

// Clear folder email
gulp.task('task:clean', () => {
  return gulp.src(config.outName)
  .pipe(clean())
})

// Render Pug
gulp.task('task:pug', () => {
  return gulp.src('src/pug/template/*.pug')
    .pipe(plumber())
    .pipe(gulpData(() => {
      return JSON.parse(fs.readFileSync('src/data/news.json'))
    }))
    .pipe(pug({
        pretty: '\t',
        compileDebug: true
    }))
    .pipe(gulp.dest(config.outName))
    .pipe(browserSync.reload({stream: true}))
})

// Copy images to folder email
gulp.task('task:copyimg', () => {
  return gulp.src('src/img/*.jpg')
    .pipe(gulp.dest(config.outName))
    .pipe(browserSync.reload({stream: true}))
})

// Build image
gulp.task('task:buildimg', () => {
    return gulp.src('src/img/*.jpg')
      .pipe(imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
      }))
      .pipe(gulp.dest(config.outName))
  })

// Static server
gulp.task('task:server', () => {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch(["src/pug/**/*.pug", "src/data/news.json"], ['task:pug']);
  gulp.watch(["src/img/*.jpg", config.outName + "/*.html"], ['task:copyimg']);
  gulp.watch(["config.outName*.html"]).on("change", browserSync.reload);
});


// Start
gulp.task('task:start', ['task:clean'], () => {
  gulp.start('task:pug', 'task:copyimg', 'task:server')
})


// Build
gulp.task("task:build", ['task:clean'], () => {
  gulp.start('task:pug', 'task:buildimg')
})
