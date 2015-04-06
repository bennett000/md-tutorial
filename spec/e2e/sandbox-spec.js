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
        page.menu1.sandbox();
    });

    it('get to the sandbox', function() {
        expect(browser.getCurrentUrl()).toBe(indexPage.host + '/#/sandbox');
    });

    it('convert sandbox input to output', function() {
        page.sandbox.input('word');
        expect(page.sandbox.output()).toBe('word');
    });
});
