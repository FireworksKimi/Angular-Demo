'use strict'; // NOSONAR

angular.module('POC').controller('EngagementCompleteController', EngagementCompleteController);

function EngagementCompleteController($scope, $rootScope, $location, $uibModal, $window, $state) {
    'ngInject';
    $window.scrollTo(0, 0);

    $scope.staffingPyramid = [
        { roles: 'Terri Burn - Partner', hours: '72 hours', margin: '2.6%' },
        { roles: 'TBD - Director', hours: '410 hours', margin: '14.7%' },
        { roles: 'Margo Smith - Manager', hours: '600 hours', margin: '22.7%' },
        { roles: 'Associate', hours: '1,237 hours', margin: '44.1%' },
        { roles: 'Exp Staff', hours: '280 hours', margin: '10%' },
        { roles: 'SA 1', hours: '200 hours', margin: '7.1%' },
    ];

    $scope.goNext = () => {
        const modalInstance = $uibModal.open({
            templateUrl: 'engagement-dashboard-modal.html',
            controller: 'engagementDashboardController',
            windowClass: 'engagement-dashboard-modal',
            backdrop: 'static',
        });

        modalInstance.result.then((result) => {
            if (result && result.action === 'createsow') {
                $scope.openCreateSowModal();
            }
        });
    };

    $scope.openCreateSowModal = () => {
        const modalInstance = $uibModal.open({
            templateUrl: 'create-sow-modal.html',
            controller: 'createSowController',
            windowClass: 'create-sow-modal',
            backdrop: 'static',
        });

        modalInstance.result.then((result) => {
            if (result && result.action === 'submitToSalesforce') {
                $scope.openSubmitSalesforceModal();
            }
        });
    };

    $scope.goPrevious = () => {
        $state.go('blockchain/three');
    };

    $scope.openSubmitSalesforceModal = () => {
        const modalInstance = $uibModal.open({
            templateUrl: 'submit-salesforce-modal.html',
            controller: 'submitSalesforceController',
            windowClass: 'submit-salesforce-modal',
            backdrop: 'static',
        });

        modalInstance.result.then((result) => {
            if (result && result.action === 'submitToSalesforce') {
                $scope.openCreateSowModal();
            }
        });
    };
}