'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rimraf = require('gulp-rimraf');
var webpack = require('gulp-webpack');
var react = require('gulp-react');
var karma = require('karma').server;

gulp.task('lint', function () {
    return gulp.src([
        './src/**/*.js',
        './spec/**/*.js',
        '*.js'
    ])
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('webpack', function() {
    return gulp.src('./src/main.js')
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('copy-index', function () {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', function () {
    return gulp.src('./dist/*.*', {read: false})
        .pipe(rimraf());
});

gulp.task('spec', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('watch', function() {
    // clean
    gulp.start('clean');

    // lint
    gulp.watch(['./src/**/*.js',
                './spec/**/*.js',
                './*.js',
                '!./dist/*.js'
                ], ['lint']);

    // webpack
    gulp.watch('./src/**/*.*', ['webpack']);
    gulp.start('webpack');

    // index.html
    gulp.watch('./src/index.html', ['copy-index']);
    gulp.start('copy-index');
});

gulp.task('tdd', function () {
    gulp.start('watch');
    // client specs
    gulp.watch(['./src/**/*.js', './spec/**/*.js'], ['spec']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['copy-index', 'webpack']);

