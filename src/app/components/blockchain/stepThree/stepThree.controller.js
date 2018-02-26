'use strict';
angular.module('POC').controller('BlockchainStepThreeController', BlockchainStepThreeController);

function BlockchainStepThreeController($scope, $state, $window) {
    'ngInject';
    $window.scrollTo(0, 0);

    const sliderNames = ['Partner', 'Director', 'Manager', 'Associate 1', 'Associate 2', 'Associate 3'];
    $scope.sliderData = sliderNames.map(item => {
        const result = {
            name: item,
            value: 480,
            callback: (newValue) => {
                result.value = parseInt(newValue, 10);
                setTimeout(() => {
                    $scope.$apply();
                }, 0);
            },
        };
        return result;
    });

    $scope.backToDashboard = () => {
        $state.go('dashboard');
    };

    $scope.back = () => {
        $state.go('blockchain/two');
    };

    $scope.done = () => {
        $state.go('engageComplete');
    };
}