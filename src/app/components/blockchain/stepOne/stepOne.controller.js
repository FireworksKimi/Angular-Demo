'use strict';
angular.module('POC').controller('BlockchainStepOneController', BlockchainStepOneController);

function BlockchainStepOneController($scope, $state, $window) {
    'ngInject';
    $window.scrollTo(0, 0);

    $scope.backToDashboard = () => {
        $state.go('dashboard');
    };

    $scope.next = () => {
        $state.go('blockchain/two');
    };
}