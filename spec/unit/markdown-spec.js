/**
 * file: markdown-spec.js
 * Created by michael on 28/03/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
it, module,inject, workular, failPromise, angular */


describe('markdown services', function() {
    'use strict';

    var mds, scope;

    beforeEach(function() {
        module('md-tutorial');

        inject(function (mdtMarked, $rootScope) {
            mds = mdtMarked;
            scope = $rootScope;
        });
    });

    it('should resolve a promise', function() {
        mds.render('*hi*').then(function (html) {
            expect(true).toBe(true);
        }, failPromise(angular.noop));
        scope.$apply();
    });

});