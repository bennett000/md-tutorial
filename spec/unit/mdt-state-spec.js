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

    afterEach(function() {
        ls.removeAll();
    });

    it('should store a state in a localStorage namespace sandbox-', function() {
        var label = 'something', data = '*hi';
        state.file(label, data);
        expect(ls.get('sandbox-' + label)).toBe(data);
    });

    it('double saves should not trigger localStorage.set', function() {
        var label = 'something', data = '*hi';
        spyOn(ls, 'set').and.callThrough();
        state.file(label, data);
        expect(ls.set.calls.count()).toBe(1);
        state.file(label, data);
        expect(ls.set.calls.count()).toBe(1);
    });

    it('given no parameters returns an empty string', function() {
        expect(state.file()).toBe('');
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
        state.file(label, data);
        expect(ls.get('sandbox-' + label)).toBe(data);
    });

    it('Get should only call localStorage.get once', function() {
        var label = 'something', data = '*hi';
        // control
        expect(ls.get('sandbox-' + label)).toBe(data);
        // test
        spyOn(ls, 'get').and.callThrough();
        state.file(label);
        expect(ls.get.calls.count()).toBe(1);
        state.file(label);
        expect(ls.get.calls.count()).toBe(1);

        // cleanup describe block
        ls.removeAll();
    });

    it('should have a current value function, that starts as "__new __file"',
       function() {
           expect(state.current()).toBe('__new __file');
       });

    it('should be able to set current values', function() {
        state.current('bowie');
        expect(state.current()).toBe('bowie');
    });

    it('should be able to register update callbacks', function() {
        var done = false;
        state.onUpdate(function() {
            done = true;
        });
        state.current('test');
        expect(done).toBe(true);
    });

    it('should be able to de-register update callbacks', function() {
        var done = false,
            remove = state.onUpdate(function() {
                done = true;
            });
        remove();
        state.current('test');
        expect(done).toBe(false);
    });

    it('should be able to save something as something else', function() {
        state.file('test1', 'word');
        state.saveAs('test1', 'test2');
        expect(state.file('test2')).toBe('word');
    });

    it('when saving "__new __file" as something else it should reset new file',
       function() {
           var nf = '__new __file', word = 'word';
           state.file(nf, word);
           expect(state.file(nf)).toBe(word);
           state.saveAs(nf, 'test');
           expect(state.file(nf)).toBe('');
       });
    // Start a new describe block
});
