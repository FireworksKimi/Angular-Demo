'use strict';

angular.module('POC')
    .controller('submitSalesforceController', submitSalesforceController);

function submitSalesforceController($scope, $uibModalInstance, $uibModal, $state) {
    initialize();
    function initialize() {
        $scope.username = '';
        $scope.users = [
            { name: 'jeremy shao' },
        ];
    }

    $scope.closeModal = () => {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.chooseOpportunity = (opportunity) => {
        $uibModalInstance.close(opportunity);
    };

    $scope.addUser = () => {
        $scope.users.push({
            name: $scope.username,
        });
        $scope.username = '';
    };

    $scope.deleteUser = (index) => {
        $scope.users.splice(index, 1);
    };

    $scope.generateSow = () => {
        $uibModalInstance.dismiss('cancel');
        $state.go('dashboard');
    };
}