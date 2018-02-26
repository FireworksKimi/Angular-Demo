'use strict'; // NOSONAR
angular.module('POC')
    .factory('apiService',
        ($http, api, localStorageService, $state, $rootScope, $timeout) => {
            'ngInject'; // NOSONAR
            const svc = {};
            const apiRoute = api.isDev ? api.devRoute : api.proRoute;
            let requestUrlList = [];

            const pushToRequestList = (url) => {
                requestUrlList.push(url);
                $rootScope.showLoading = true;
            };

            const pullFromRequestList = (url) => {
                requestUrlList = requestUrlList.filter((item) => item !== url);
                if (requestUrlList.length === 0) {
                    $rootScope.showLoading = false;
                }
                $timeout(() => {
                    $rootScope.$apply();
                }, 0);
            };

            function http(req, innerFunction) {
                if ('' && !req.headers.token) {
                    req.headers = angular.extend(req.headers, {
                        'x-xsrf-token': '',
                    });
                }
                pushToRequestList(req.url);
                const promise = new Promise((resolve, reject) => {
                    $http(req).then((res) => {
                        const xsrfToken = res.headers()['x-xsrf-token'];
                        localStorageService.set('x-xsrf-token', xsrfToken);
                        resolve(res.data);
                        if (innerFunction) {
                            innerFunction(res);
                        }
                    }, (error) => {
                        $rootScope.showLoading = false;
                        if (error.status && error.status === 504) {
                            if ($rootScope.currentUser) {
                                $rootScope.currentUser = null;
                                localStorageService.clearAll();
                                localStorage.removeItem('user');
                                $state.go('dashboard');
                            }
                        } else {
                            reject(error);
                        }
                    });
                });
                promise.then(() => {
                    pullFromRequestList(req.url);
                }, () => {
                    pullFromRequestList(req.url);
                });
                return promise;
            }

            svc.http = http;

            svc.post = (url, data, innerFunction, responseType) => {
                const result = svc.http({
                    data,
                    responseType,
                    method: 'post',
                    url: apiRoute + url,
                    headers: {
                        'x-xsrf-token': localStorageService.get('x-xsrf-token'),
                    },
                }, innerFunction);
                return result;
            };

            svc.get = (url, data, innerFunction) => {
                const result = svc.http({
                    data,
                    method: 'get',
                    url: apiRoute + url,
                    headers: {
                        'x-xsrf-token': localStorageService.get('x-xsrf-token'),
                    },
                }, innerFunction);
                return result;
            };

            svc.put = (url, data, innerFunction) => {
                const result = svc.http({
                    data,
                    method: 'put',
                    url: apiRoute + url,
                    headers: {
                        'x-xsrf-token': localStorageService.get('x-xsrf-token'),
                    },
                }, innerFunction);
                return result;
            };

            svc.delete = (url, data, innerFunction) => {
                const result = svc.http({
                    data,
                    method: 'delete',
                    url: apiRoute + url,
                    headers: {
                        'x-xsrf-token': localStorageService.get('x-xsrf-token'),
                        'Content-Type': 'application/json',
                    },
                }, innerFunction);
                return result;
            };

            return svc;
        }
    );