'use strict';

angular.module('POC')
    .controller('quickFinancialsController', quickFinancialsController);

function quickFinancialsController($scope, $uibModalInstance, $uibModal, localStorageService, $state) {
    initialize();
    function initialize() {
        $scope.showStep1 = true;
        $scope.showStep2 = false;
        $scope.showStep3 = false;
        $scope.opportunityList = [
            {
                company: 'Symantic',
                opportunityName: 'Blockchain Gap Analysis',
            },
            {
                company: 'Symantic',
                opportunityName: 'Support Bot Development',
            },
            {
                company: 'Adobe',
                opportunityName: 'Collaboration Strategy',
            }];
    }

    $scope.showStepTwo = () => {
        $scope.showStep2 = true;
        $scope.showStep1 = false;
        $scope.showStep3 = false;
    };

    $scope.goStepThree = () => {
        $scope.showStep3 = true;
        $scope.showStep1 = false;
        $scope.showStep2 = false;
    };

    $scope.closeModal = () => {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.chooseOpportunity = (opportunity) => {
        $uibModalInstance.close(opportunity);
    };
}