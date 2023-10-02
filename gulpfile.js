import gulp from 'gulp';
import pkg from 'gulp'
const { src, dest, parallel, series, watch } = pkg;
// const {
//     src,
//     dest,
//     series,
//     watch
// } = require('gulp');
//const deleteSync = require('del');
import { deleteSync } from 'del';
//const dartSass = require('sass');
import dartSass from 'sass';
//const gulpSass = require('gulp-sass');
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
//const autoprefixer = require('gulp-autoprefixer');
import autoprefixer from 'gulp-autoprefixer'
//const gcssmq = require('gulp-group-css-media-queries');
import gcssmq from 'gulp-group-css-media-queries'
//const browserSync = require('browser-sync');
import browserSync from 'browser-sync'
//const gulpFileInclude = require('gulp-file-include');
import gulpFileInclude from 'gulp-file-include'
//const cleanCss = require('gulp-clean-css');
import cleanCss from 'gulp-clean-css'
//const rename = require('gulp-rename');
import rename from 'gulp-rename'
//const concat = require('gulp-concat');
import concat from 'gulp-concat'

function browsersync() {
    browserSync.init({
        server: {
            baseDir: './public/',
            serveStaticOptions: {
                extensions: ['html'],
            },
        },
        port: 8080,
        ui: { port: 8081 },
        open: true,
    })
}

function styles() {
    return src(['./src/styles/*.scss', './src/components/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(autoprefixer({ grid: true }))
        .pipe(gcssmq())
        .pipe(dest('./public/css/'))
        .pipe(cleanCss())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(dest('./public/css/'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src('./src/js/script.js')
        .pipe(dest('./public/js/'))
        .pipe(browserSync.stream())
}

function fileInclude() {
    return src('./src/*.html')
        .pipe(gulpFileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./public/'));
}

function copyFonts() {
    return src('./src/fonts/**/*')
        .pipe(dest('./public/fonts/'))
}

function copyImages() {
    return src('./src/images/*')
        .pipe(dest('./public/images/'))
}

function copyDocs() {
    return src('./src/docs/*')
        .pipe(dest('./public/docs/'))
}

async function copyResources() {
    copyFonts()
    copyImages()
    copyDocs()
}

async function clean() {
    return deleteSync('./public/', { force: true })
}

function watch_dev() {
    watch(['./src/styles/*.scss', './src/components/**/*.scss'], styles).on(
        'change',
        browserSync.reload,
    )
    watch(['./src/*.html', './src/components/**/*.html'], fileInclude).on(
        'change',
        browserSync.reload,
    )
    watch(['./src/js/*.js'], scripts).on(
        'change',
        browserSync.reload,
    )
}

const dev = series(clean, scripts, styles, copyResources, fileInclude, gulp.parallel(watch_dev, browsersync));
gulp.task('default', dev);
