module.exports = {
    "extends": "airbnb-base",
    "globals": {
        "angular": true,
        "toastr": true,
        "Stomp": true,
        "SockJS": true,
        "$": true,
        "_": true,
        "noUiSlider": true,
    },
    "parserOptions": {
        "sourceType": "script",
    },
    "env": {
        "browser": true,
    },
    "rules": {
        "indent": ["error", 4],
        "max-len": ["error", { "code": 240 }],
        "no-param-reassign": ["error", { "props": false }],
        "no-use-before-define": ["error", { functions: false, classes: true }],
        "no-unused-expressions": ["error", { "allowShortCircuit": true }],
        "eol-last": 0,
    },
};