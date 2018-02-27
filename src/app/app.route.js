'use strict'; // NOSONAR

angular.module('POC')
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject'; // NOSONAR
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/components/dashboard/dashboard.html',
                controller: 'DashboardController',
            });

        $urlRouterProvider.otherwise('/dashboard');
    });