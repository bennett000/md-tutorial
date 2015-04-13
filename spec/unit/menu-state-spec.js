/**
 * file: storage-spec.js
 * Created by michael on 06/04/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
 it, module,inject, workular, afterEach */


describe('menu state', function() {
    'use strict';
    var menuState;

    beforeEach(function() {
        module('md-tutorial');
        inject(function(mdtMenuState) {
            menuState = mdtMenuState;
        });
    });

    it('should start off at /sandbox', function() {
        expect(menuState.selected()).toBe('/sandbox');
    });

    it('should accept arbitrary states', function() {
        expect(menuState.selected('hah')).toBe('hah');
    });

    it('should register on select callbacks', function() {
        var done = false;
        menuState.onSelect(function () {
            done = true;
        });
        menuState.selected('blah');
        expect(done).toBe(true);
    });

    it('should register on toggle callbacks', function() {
        var done = false;
        menuState.onToggle(function () {
            done = true;
        });
        menuState.toggle('blah');
        expect(done).toBe(true);
    });

    it('should register on prompt callbacks', function() {
        var done = false;
        menuState.onPrompt(function () {
            done = true;
        });
        menuState.prompt('blah');
        expect(done).toBe(true);
    });
});
