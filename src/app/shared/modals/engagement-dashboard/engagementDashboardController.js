'use strict';

angular.module('POC')
    .controller('engagementDashboardController', engagementDashboardController);

function engagementDashboardController($scope, $uibModalInstance, $uibModal, localStorageService, $state) {
    function initialize() {

    }

    initialize();

    $scope.closeModal = () => {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.createSow = () => {
        $uibModalInstance.close({
            action: 'createsow'
        });
    };
};
