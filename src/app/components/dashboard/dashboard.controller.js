'use strict'; // NOSONAR

angular.module('POC').controller('DashboardController', DashboardController);

function DashboardController($scope, $rootScope, $location, $window, $state, $uibModal) {
    'ngInject';

    function initialize() {}

    $scope.openFinancialsModel = () => {
        const modalInstance = $uibModal.open({
            templateUrl: 'quick-financials-modal.html',
            controller: 'quickFinancialsController',
            windowClass: 'quick-financial-modal',
            backdrop: 'static',
        });

        modalInstance.result.then((data) => {
            console.log(data);
            $state.go('blockchain/one');
        });
    };

    initialize();
}