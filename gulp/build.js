'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var zip = require('gulp-zip');
var maven = require('gulp-maven-deploy');
var babel = require('gulp-babel');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function() {
    return gulp.src([
            path.join(conf.paths.src, '/app/**/*.html'),
            path.join(conf.paths.tmp, '/serve/app/**/*.html')
        ])
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: 'IDA',
            root: 'app'
        }))
        .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function() {
    var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: path.join(conf.paths.tmp, '/partials'),
        addRootSlash: false
    };

    var htmlFilter = $.filter('*.html', { restore: true });
    var jsFilter = $.filter('**/app-*.js', { restore: true });
    var jsLibFilter = $.filter('**/vendor-*.js', { restore: true });
    var cssFilter = $.filter('**/*.css', { restore: true });
    var assets;

    return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
        .pipe($.inject(partialsInjectFile, partialsInjectOptions))
        .pipe(assets = $.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
        .pipe(babel({ compact: true, presets: ['es2015'] }))
        .pipe($.sourcemaps.init())
        .pipe($.ngAnnotate())
        .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
        .pipe($.sourcemaps.write('maps'))
        .pipe(jsFilter.restore)
        .pipe(jsLibFilter)
        .pipe($.uglify())
        .pipe(jsLibFilter.restore)
        .pipe(cssFilter)
        .pipe($.sourcemaps.init())
        .pipe($.replace("../../bower_components/fontawesome/fonts/", '../fonts/'))
        .pipe($.replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
        .pipe($.minifyCss({ processImport: false }))
        .pipe($.sourcemaps.write('maps'))
        .pipe(cssFilter.restore)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
            conditionals: true
        }))
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
        .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function() {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('other', function() {
    var fileFilter = $.filter(function(file) {
        return file.stat.isFile();
    });

    return gulp.src([
            path.join(conf.paths.src, '/**/*'),
            path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
        ])
        .pipe(fileFilter)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function() {
    return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/'), path.join('.', '*.war')]);
});

gulp.task('cleanwar', function() {
    return $.del([path.join('.', '*.war')]);
});

gulp.task('war', function() {
    return gulp.src([path.join(conf.paths.dist, '**/**/*'), path.join(conf.paths.dist, '*')])
        //.pipe(war({welcome:'index.html'}))
        .pipe(zip('Angular-Demo.war'))
        .pipe(gulp.dest("."));
});


gulp.task('deploy-local', function() {
    gulp.src('.')
        .pipe(maven.install({
            'config': {
                'groupId': 'com.pwc.advisory.analytic.fmv',
                'type': 'war',
                'artifactId': 'front',
                'version': '1.0.0-SNAPSHOT'
            }
        }))
});

gulp.task('build', ['html', 'fonts', 'other']);