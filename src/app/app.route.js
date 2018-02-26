'use strict'; // NOSONAR

angular.module('POC')
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject'; // NOSONAR
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/components/dashboard/dashboard.html',
                controller: 'DashboardController',
            })
            .state('engageComplete', {
                url: '/engage-complete',
                templateUrl: 'app/components/engagementComplete/engagementComplete.html',
                controller: 'EngagementCompleteController',
            })
            .state('blockchain/one', {
                url: '/blockchain/one',
                templateUrl: 'app/components/blockchain/stepOne/stepOne.html',
                controller: 'BlockchainStepOneController',
            })
            .state('blockchain/two', {
                url: '/blockchain/two',
                templateUrl: 'app/components/blockchain/stepTwo/stepTwo.html',
                controller: 'BlockchainStepTwoController',
            })
            .state('blockchain/three', {
                url: '/blockchain/three',
                templateUrl: 'app/components/blockchain/stepThree/stepThree.html',
                controller: 'BlockchainStepThreeController',
            });

        $urlRouterProvider.otherwise('/dashboard');
    });