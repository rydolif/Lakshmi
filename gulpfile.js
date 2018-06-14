'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  rigger = require('gulp-rigger'),
  cssmin = require('gulp-minify-css'),
  tinypng = require('gulp-tinypng'),
  rimraf = require('rimraf'),
  browserSync = require("browser-sync"),
  reload = browserSync.reload,
  spritesmith = require('gulp.spritesmith');

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "Frontend"
};

gulp.task('webserver', function () {
    browserSync({
        server: { baseDir: "./build" },
        tunnel: false,
        host: 'localhost',
        port: 8080,
        open: true,
        logLevel: "silent",
        notify: false,
        logLevel: "info"
    });
});

gulp.task('clean', function(cb) {
  rimraf(path.clean, cb);
});

gulp.task('html:build', function() {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('js:build', function() {
  gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('style:build', function() {
  gulp.src(path.src.style)
    .pipe(plumber())
    .pipe(sass({
      includePaths: ['src/style/'],
      outputStyle: 'compressed',
      sourceMap: true,
      errLogToConsole: true
    }))
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('image:build', function() {
    return gulp.src("src/img/*.{png,jpg,gif}")
        .pipe(tinypng('1I7Xz35KM-WH_XqPaKkHUTecH-jpUJyx'))
        .pipe(gulp.dest('build/img'))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({
          stream: true
        }));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
  'html:build',
  'style:build',
  'fonts:build',
  'image:build',
  'js:build'
]);


gulp.task('watch', function() {
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
});

gulp.task('sprite', function() {
  var spriteData = gulp.src('src/img/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    algorithm: 'top-down',
    padding: 100
  }));
  return spriteData.pipe(gulp.dest('src/sprites/'));
});


gulp.task('default', ['build', 'webserver', 'watch']);
