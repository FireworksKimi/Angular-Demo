'use strict'; // NOSONAR
angular.module('POC')
    .factory('appService', (localStorageService, apiService) => {
        'ngInject'; // NOSONAR
        const appService = {};

        appService.clearClientLocalStorage = (clientId) => {
            let clientObj = localStorageService.get('clientVoList');
            clientObj = _.reject(clientObj, (client) => clientId === client.clientId);
            localStorageService.set('clientVoList', clientObj);

            let clientDetailObj = localStorageService.get('clientDetail');
            clientDetailObj = _.reject(clientDetailObj, (client) => clientId === client.clientId);
            localStorageService.set('clientDetail', clientDetailObj);

            let clientsDetailsListObj = localStorageService.get('clientsDetailsList');
            clientsDetailsListObj = _.reject(clientsDetailsListObj, (client) => client.clientId === clientId);

            localStorageService.set('clientsDetailsList', clientsDetailsListObj);
        };

        appService.logout = () => apiService.get('/logout');

        return appService;
    });