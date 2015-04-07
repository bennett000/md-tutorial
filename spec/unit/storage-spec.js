/**
 * file: storage-spec.js
 * Created by michael on 06/04/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs, it, module,inject, workular */


describe('', function() {
    'use strict';
    var ls;

    beforeEach(function() {
        module('md-tutorial');
        inject(function (localStorage){
            ls = localStorage;
        });
    });

    it('should start empty', function() {
        expect(ls.length()).toBe(0);
    });
});