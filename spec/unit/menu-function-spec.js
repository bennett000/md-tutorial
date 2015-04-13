/**
 * file: storage-spec.js
 * Created by michael on 06/04/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
 it, module,inject, workular, afterEach */


describe('menu functions', function() {
    'use strict';
    var mf, loc, ms, w, sandboxState, scope;

    beforeEach(function() {
        module('md-tutorial', function ($provide) {
            $provide.value('$window', {location:{href:'dummy'}});
        });
        inject(function(mdtMenuFunctions, $location, mdtMenuState,
                        $window, mdtSandboxState, $rootScope) {
            mf = mdtMenuFunctions;
            loc = $location;
            ms = mdtMenuState;
            w = $window;
            sandboxState = mdtSandboxState;
            scope = $rootScope;
        });
    });

    it('go should be an alias for $location.path', function() {
        spyOn(loc, 'path').and.callThrough();
        mf.go('word');
        expect(loc.path).toHaveBeenCalledWith('word');
    });

    it('go should set the current menu selection', function() {
        spyOn(ms, 'selected').and.callThrough();
        mf.go('word', 'dude');
        expect(ms.selected).toHaveBeenCalledWith('dude');
    });

    it('email should do nothing if there is no current data', function() {
        expect(mf.email()).toBeUndefined();
    });

    it('email should set $window.location.href if there is data', function() {
        var start = w.location.href;
        sandboxState.file('ooga', 'asdfasdfasdfasd');
        sandboxState.current('ooga');
        mf.email();
        expect(w.location.href).not.toBe(start);
    });

    it('email should not use filename as subject if new file', function() {
        sandboxState.file('__new __file', 'asdfasdfasdfasd');
        mf.email();
        expect(w.location.href.indexOf('__new __file')).toBe(-1);
    });

    it('email should use filename as subject', function() {
        sandboxState.file('collins', 'asdfasdfasdfasd');
        sandboxState.current('collins');
        mf.email();
        expect(w.location.href.indexOf('collins')).not.toBe(-1);
    });

    it('download should not use filename as subject if new file', function() {
        sandboxState.file('__new __file', 'asdfasdfasdfasd');
        mf.download();
        expect(w.location.href.indexOf('__new __file')).toBe(-1);
    });

    it('download should use filename as subject', function() {
        spyOn(window, 'open');
        sandboxState.file('collins', 'asdfasdfasdfasd');
        sandboxState.current('collins');
        mf.download();
        scope.$apply();
        expect(window.open).toHaveBeenCalled();
    });
});
