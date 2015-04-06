/*global require, module, element, by */

/**
 * The Menu route
 * @constructor
 */
function Menu() {
    'use strict';
}

Menu.prototype.walk = walk;

/**
 * @param {function(...)} callback
 */
function walk(callback) {
    'use strict';

    element.all(by.css('.mdt-applet-selector')).then(function (els) {
        els.forEach(function (el){
            callback(el);
        });
    });

}


module.exports = Menu;
