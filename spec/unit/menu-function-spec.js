/**
 * file: storage-spec.js
 * Created by michael on 06/04/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
 it, module,inject, workular, afterEach */


describe('menu functions', function() {
    'use strict';
    var mf, loc;

    beforeEach(function() {
        module('md-tutorial');
        inject(function(mdtMenuFunctions, $location) {
            mf = mdtMenuFunctions;
            loc = $location;
        });
    });

    it('go should be an alias for $location.path', function() {
        spyOn(loc, 'path').and.callThrough();
        mf.go('word');
        expect(loc.path).toHaveBeenCalledWith('word');
    });
});
