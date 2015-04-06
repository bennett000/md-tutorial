/*global require, module, browser */
var host   = 'http://127.0.0.1:31415',
    // Add routes to be tested here
    // each route name must have a matching `.js` file in this directory
    // that `.js` file must expose a constructor
    // like module.exports = function Applet() {}
    routes = ['sandbox', 'reference', 'tutorial'],
    Menu1 = require('./menu1');

/** the "main" page in the single page application (SPA) */
function IndexPage() {
    'use strict';

    var that = this;

    browser.get(host);

    routes.forEach(function (route) {
        that[route] = new require('./' + route);
    });

    this.menu1 = new Menu1();
}

module.exports = {
    Page: IndexPage,
    host: host,
    routes: routes
};