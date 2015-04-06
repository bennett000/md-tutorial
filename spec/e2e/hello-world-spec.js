/**
 * file: hello-world-spec.js
 * Created by michael on 28/03/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
it, module,inject, workular, browser, require */

var indexPage = require('./page-index');

describe('md-tutorial hello world test', function() {
    'use strict';
    var page;

    beforeEach(function() {
        page = new indexPage.Page();
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Markdown Tutorial');
    });

});
