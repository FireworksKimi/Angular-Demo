'use strict';

angular.module('POC').directive('ngEnter', () => {
    return (scope, element, attrs) => {
        element.bind('keydown keypress', (event) => {
            if (event.which === 13) {
                scope.$apply(() => {
                    scope.$eval(attrs.ngEnter, { 'event': event, });
                });

                event.preventDefault();
            }
        });
    };
});