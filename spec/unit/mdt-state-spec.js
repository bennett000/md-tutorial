/**
 * file: storage-spec.js
 * Created by michael on 06/04/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
 it, module,inject, workular, afterEach */


describe('sandbox state', function() {
    'use strict';
    var state, ls;

    beforeEach(function() {
        module('md-tutorial');
        inject(function(localStorage, mdtSandboxState) {
            state = mdtSandboxState;
            ls = localStorage;
            ls.removeAll();
        });
    });

    afterEach(function () {
        ls.removeAll();
    });

    it('should store a state in a localStorage namespace sandbox-', function() {
        var label = 'something', data = '*hi';
        state(label, data);
        expect(ls.get('sandbox-' + label)).toBe(data);
    });

    it('double saves should not trigger localStorage.set', function() {
        var label = 'something', data = '*hi';
        spyOn(ls, 'set').and.callThrough();
        state(label, data);
        expect(ls.set.calls.count()).toBe(1);
        state(label, data);
        expect(ls.set.calls.count()).toBe(1);
    });

    it('given no parameters returns an empty string', function() {
        expect(state()).toBe('');
    });
});

describe('sandbox state (persistence)', function() {
    'use strict';
    var state, ls;

    // this describe block is a little special in that it does *not* clean up
    // localStorage until *after* its last test.  This is to test some
    // branches that occur when starting *with* storage data

    beforeEach(function() {
        module('md-tutorial');
        inject(function(localStorage, mdtSandboxState) {
            state = mdtSandboxState;
            ls = localStorage;
        });
    });

    it('Setup storage data for next test', function() {
        var label = 'something', data = '*hi';
        state(label, data);
        expect(ls.get('sandbox-' + label)).toBe(data);
    });

    it('Get should only call localStorage.get once', function() {
        var label = 'something', data = '*hi';
        // control
        expect(ls.get('sandbox-' + label)).toBe(data);
        // test
        spyOn(ls, 'get').and.callThrough();
        state(label);
        expect(ls.get.calls.count()).toBe(1);
        state(label);
        expect(ls.get.calls.count()).toBe(1);

        // cleanup describe block
        ls.removeAll();
    });
    // Start a new describe block
});
