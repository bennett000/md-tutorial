/**
 * file: hello-world-spec.js
 * Created by michael on 28/03/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
it, module,inject, workular, browser, element, by */

/* @todo figure out how to load a config */
var host = 'http://127.0.0.1:31415',
routes = ['sandbox', 'reference', 'walkthrough'];

describe('change the routes', function() {
    'use strict';

    it('should start at /#/', function() {
        browser.get(host);
        expect(browser.getCurrentUrl()).toBe(host + '/#/');
    });

    /* @todo this test is horrendous */
    it('applet selection ', function() {
        element.all(by.css('.mdt-applet-selector')).then(function (els) {
            var lastRoute;
            els.forEach(function (el){
                el.click();
                var route = browser.getCurrentUrl(),
                match = false;
                expect(route).not.toBe(lastRoute);
                routes.forEach(function (r){
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

});
