'use strict';
angular.module('POC').controller('BlockchainStepTwoController', BlockchainStepTwoController);

function BlockchainStepTwoController($scope, $state, $window) {
    'ngInject';
    $window.scrollTo(0, 0);

    $scope.backToDashboard = () => {
        $state.go('dashboard');
    };

    $scope.back = () => {
        $state.go('blockchain/one');
    };

    $scope.next = () => {
        $state.go('blockchain/three');
    };
}