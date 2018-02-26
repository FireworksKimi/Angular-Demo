'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var paths = {
    src: 'src',
    dist: 'fmv',
    tmp: '.tmp',
    e2e: 'e2e',
    bower: 'bower_components'
};
var middleware = require('./proxy');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if (baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
        routes = {
            '/bower_components': 'bower_components'
        };
    }
    var server = {
        baseDir: baseDir,
        routes: routes,
        middleware: [
            // proxyMiddleware('/ida-api/api/', { // for production
            proxyMiddleware('/idea-backend/api/', { // for eclipse
                //proxyMiddleware('/ida/api/', { // for Intellij
                // target: 'http://strl099021:9150'
                //target: 'http://strl099021:9150'
                target: 'http://localhost:8080'
                    //target: 'http://strl099049.mso.net:8080'
                    //target: 'http://strl099020:9190'
            })
        ]
    };

    browserSync.instance = browserSync.init({
        port: 3000,
        startPath: '/',
        server: server,
        browser: browser
    });
}

browserSync.use(browserSyncSpa({
    selector: '[ng-app]' // Only needed for angular apps
}));

gulp.task('serve', ['watch'], function() {
    browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function() {
    browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function() {
    browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], null, []);
});

gulp.task('serve:e2e-dist', ['build'], function() {
    browserSyncInit(conf.paths.dist, null, []);
});