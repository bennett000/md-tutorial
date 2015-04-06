/**
 * file: hello-world-spec.js
 * Created by michael on 28/03/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
it, module,inject, workular, browser, element, by, require */

var indexPage = require('./page-index/index.js');

describe('change the routes', function() {
    'use strict';
    var page;

    beforeEach(function() {
        page = new indexPage.Page();
    });

    it('should start at /#/', function() {
        expect(browser.getCurrentUrl()).toBe(indexPage.host + '/#/sandbox');
    });

    /* @todo this test is horrendous */
    it('applet selection ', function() {
        var lastRoute;
        page.menu1.walk(function (el) {
            el.click();
            var route = browser.getCurrentUrl(),
                match = false;
            expect(route).not.toBe(lastRoute);
            indexPage.routes.forEach(function (r){
                if (match) { return; }
                if (route.indexOf) {
                    match = route.indexOf(r);
                }
                if (match > -1) {
                    match = true;
                } else {
                    match = false;
                }
            });
        });
    });

});
