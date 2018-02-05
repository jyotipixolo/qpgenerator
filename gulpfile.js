var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');

// ... variables
// var autoprefixerOptions = {
//   browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
// };
var paths = {
  sass: ['./www/scss/**/*.scss']
};

gulp.task("serve:before", ['watch']);

gulp.task('default', ['sass', 'autoprefix','processes','watch'], function () { 

});

gulp.task('sass', function (done) {
  console.log('I am called secondly');
  gulp.src('./www/scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))

    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('autoprefix', function (){
  console.log('I am called firstly');
  gulp.src('./www/css/ionic.app.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('./www/css/'))
});

gulp.task('processes', function () {
  console.log('processes');
  runSequence('sass', 'autoprefix');
});


  gulp.watch(paths.sass, ['processes']);

