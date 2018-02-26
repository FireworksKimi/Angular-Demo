'use strict'; // NOSONAR

angular.module('POC', ['ngAnimate', 'ngCookies', 'ngSanitize',
    'ngResource', 'ui.router', 'ui.bootstrap',
    'ngTable', 'restangular', 'LocalStorageModule',
    'smart-table', 'angularModalService', 'nya.bootstrap.select',
    'base64', 'angularjs-dropdown-multiselect', 'highcharts-ng', 'angular-click-outside',
    'checklist-model', 'monospaced.elastic', 'angulartics', 'angulartics.piwik',
])
.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized',
})
.constant('api', {
    // demo: /DATA/idea-demo/cluster23/tomcat-webapps/
    // dev: /DATA/idea-dev/cluster20/tomcat-webapps/
    // dev: 8082, demo:8081, prod: 8080
    // proRoute: 'http://strl099049.mso.net:8082/idea-backend/api',
    proRoute: '/idea-backend/api',
    // devRoute: '/ida-web/api', // for eclipse
    // devRoute: '/ida/api', // for intellij
    devRoute: '/idea-backend/api',
    // devRoute: '', // this for app.backend.js
    isDev: false,
    isDemo: false,
})
.config(localStorageServiceProvider => {
    'ngInject'; // NOSONAR
    localStorageServiceProvider
        .setPrefix('IDA-DEV')
        .setStorageCookie(30, '/')
        .setNotify(true, true);
})
.config($httpProvider => {
    'ngInject'; // NOSONAR
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'x-xsrf-token';
})
.run(($rootScope, $location, localStorageService, $http, $templateCache, $state, api) => {
    'ngInject'; // NOSONAR
    // keep user logged in after page refresh
});