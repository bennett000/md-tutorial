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
        expect(menuState.current()).toBe('/sandbox');
    });

    it('should accept arbitrary states', function() {
        expect(menuState.current('hah')).toBe('hah');
    });

    it('should register udpate callbacks', function() {
        var done = false;
        menuState.onUpdate(function () {
            done = true;
        });
        menuState.current('blah');
        expect(done).toBe(true);
    });
});
