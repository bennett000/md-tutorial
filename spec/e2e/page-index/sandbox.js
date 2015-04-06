/*global require, module, protractor, element, by */

/**
 * The Sandbox route
 * @constructor
 */
function Sandbox() {
    'use strict';
}

Sandbox.prototype.input = input;
Sandbox.prototype.output = output;

module.exports = Sandbox;

function input(data) {
    'use strict';

    if (data === undefined) {
        return element(by.css('.app-sandbox')).
        element(by.css('.mdt-md-input')).getText();
    } else {
        element(by.css('.app-sandbox')).
        element(by.css('.mdt-md-input')).sendKeys(data);
    }
}

function output() {
    'use strict';
    return element(by.css('.app-sandbox')).
    element(by.css('.mdt-md-output')).getText();
}

