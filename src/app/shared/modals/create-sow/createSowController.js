'use strict';

angular.module('POC')
    .controller('createSowController', createSowController);

function createSowController($scope, $uibModalInstance, $uibModal) {
    function initialize() {

    }

    initialize();

    $scope.closeModal = () => {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.createSow = () => {
        $uibModalInstance.close({
            action: 'createsow',
        });
    };

    $scope.submitToSalesforce = () => {
        $uibModalInstance.close({
            action: 'submitToSalesforce',
        });
    };
};