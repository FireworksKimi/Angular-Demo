'use strict';
angular.module('POC').directive('pocSlider', pocSlider);

function pocSlider() {
    return {
        restrict: 'A',
        scope: {
            value: '=',
            callback: '=',
        },
        link: (scope, element) => {
            const slider = element[0];

            noUiSlider.create(slider, {
                start: scope.value,
                animate: false,
                range: {
                    min: 0,
                    max: 480,
                },
            });

            slider.noUiSlider.on('update', (values, handle) => {
                scope.callback && scope.callback(values[handle]);
            });
        },
    };
}