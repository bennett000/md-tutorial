/**
 * file: storage-spec.js
 * Created by michael on 06/04/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
 it, module,inject, workular, afterEach */


describe('natural sort', function() {
    'use strict';
    var ns;

    beforeEach(function() {
        module('md-tutorial');
        inject(function(mdtNaturalSort) {
            ns = mdtNaturalSort;
        });
    });

    it('[a1, a10, a2]', function() {
        var s = ['a1', 'a10', 'a2'].sort(ns);
        expect(s[1]).toBe('a2');
        expect(s[2]).toBe('a10');
    });

    it('[a1, a1, a10, a2, z]', function() {
        var s = ['a1', 'a10', 'a1', 'a2', 'z'].sort(ns);
        expect(s[2]).toBe('a2');
        expect(s[3]).toBe('a10');
    });

    it('[a1, a1, a1, a10, a2, z, z, z, z3]', function() {
        var s = ['a1', 'z', 'z3', 'a10', 'a1', 'a1', 'a2', 'z'].sort(ns);
        expect(s[3]).toBe('a2');
        expect(s[4]).toBe('a10');
    });

    it('[5, 4, 3, 0]', function() {
        var s = [5, 4, 3, 0].sort(ns);
        expect(s.join('')).toBe('0345');
    });
});
