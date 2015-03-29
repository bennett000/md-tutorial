/**
 * file: hello-world-spec.js
 * Created by michael on 28/03/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
it, module,inject, workular, browser */

/* @todo figure out how to load a config */
var host = 'http://127.0.0.1:31415',
    /* @todo DRY failure */
title = 'Markdown Tutorial';

describe('md-tutorial hello world test', function() {
    'use strict';
    it('should have a title', function() {
        browser.get(host);

        expect(browser.getTitle()).toEqual(title);
    });

});
