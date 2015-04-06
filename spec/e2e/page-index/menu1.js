/*global require, module, element, by, console */

/**
 * The Menu route
 * @constructor
 */
function Menu() {
    'use strict';
}

Menu.prototype.walk = walk;
Menu.prototype.sandbox = sandbox;
Menu.prototype.tutorial = tutorial;
Menu.prototype.reference = reference;

module.exports = Menu;

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

function getMenuItemByOrder(item, callback) {
    'use strict';
    item = +item;
    if (item < 0) {
        callback(new Error('invalid menu index: ' + item));
        return;
    }

    element.all(by.css('.mdt-applet-selector')).then(function (els) {
        if (item > els.length) {
            callback(new Error('invalid menu index: ' + item));
            return;
        }
        els.forEach(function (el, i){
            if (i === item) {
                callback(null, el);
            }
        });
    });
}

function go(err, el) {
    'use strict';

    if (err) {
        console.log(err.message);
        return;
    }

    el.click();
}

function sandbox() {
    'use strict';

    getMenuItemByOrder(0, go);
}

function tutorial() {
    'use strict';

    getMenuItemByOrder(0, go);
}

function reference() {
    'use strict';

    getMenuItemByOrder(0, go);
}


