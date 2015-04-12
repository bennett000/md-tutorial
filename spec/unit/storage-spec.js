/**
 * file: storage-spec.js
 * Created by michael on 06/04/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
it, module,inject, workular, afterEach */


describe('Storage (local/session/poly) specs', function() {
    'use strict';
    var ls;

    beforeEach(function() {
        module('md-tutorial');
        inject(function(localStorage) {
            ls = localStorage;
            ls.removeAll();
        });
    });

    afterEach(function () {
        ls.removeAll();
    });

    it('should start empty', function() {
        expect(ls.length()).toBe(0);
    });

    it('should set items as strings', function() {
        ls.set('test', 567);
        expect(ls.get('test')).toBe('567');
    });

    it('should set items as strings through Object\'s .toString (native)',
       function() {
           ls.set('test', {'word': 5});
           expect(ls.get('test')).toBe('[object Object]');
       });

    it('should set items as strings through Object\'s .toString (custom)',
       function() {
           ls.set('test', {
               'word': 5,
               toString: function() {
                   return JSON.stringify(this);
               }
           });
           expect(ls.get('test')).toBe('{"word":5}');
       });

    it('should remove items', function() {
        ls.set('test', 567);
        expect(ls.get('test')).toBe('567');
        ls.remove('test');
        expect(ls.get('test')).toBeNull();
    });

    it('should remove all items', function() {
        ls.set('test', 567);
        ls.set('test2', 5672365);
        expect(ls.length()).toBe(2);
        ls.removeAll();
        expect(ls.length()).toBe(0);
    });

    it('should list items', function() {
        ls.set('test', 567);
        ls.set('test2', 5672365);
        expect(ls.list().length).toBe(2);
    });

    it('list should return subsets based on a string prefix', function() {
        ls.set('test', 567);
        ls.set('gob', 567265);
        ls.set('test2', 5672365);
        expect(ls.list('test').length).toBe(2);
    });

    it('list should accept a callback', function() {
        var len = 0;
        ls.set('test', 567);
        ls.set('gob', 567265);
        ls.set('test2', 5672365);
        ls.list(null, function (err, key) {
            len += 1;
            expect(key === 'test' || key === 'gob' || key === 'test2').
            toBe(true);
        });
        expect(len).toBe(3);
    });
});