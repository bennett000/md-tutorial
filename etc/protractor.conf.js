/*global exports*/
exports.config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    specs: ['../spec/e2e/*-spec.js'],
    jasmineNodeOpts: {
        showColors: true
    }
};