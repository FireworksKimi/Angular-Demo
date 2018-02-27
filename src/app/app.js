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
.config(localStorageServiceProvider => {
    'ngInject';
    localStorageServiceProvider
        .setPrefix('IDA-DEV')
        .setStorageCookie(30, '/')
        .setNotify(true, true);
})
.config($httpProvider => {
    'ngInject';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'x-xsrf-token';
})
.run(() => {
    'ngInject';
});