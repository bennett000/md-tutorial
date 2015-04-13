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

    it('onUpdate should return a function even if not given a callback',
       function() {
           var remove = state.onUpdate();
           expect(typeof remove).toBe('function');
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

    it('should be able to remove something', function() {
        state.file('test1', 'word');
        expect(state.file('test1')).toBe('word');
        state.remove('test1');
        expect(state.file('test1')).toBeFalsy();
    });

    it('should be able to save something as something else', function() {
        state.file('test1', 'word');
        state.saveAs('test1', 'test2');
        expect(state.file('test2')).toBe('word');
    });

    it('should be "overwrite safe" by default', function() {
        var result1 = '', result2 = '';
        state.file('test1', 'word');
        result1 = state.saveAs('test1', 'test2');
        expect(result1).toBe('');
        result2 = state.saveAs('test1', 'test2');
        expect(result2).not.toBe('');
    });

    it('should allow manual overwrites', function() {
        var word = 'word', up = 'up';
        state.file('test1', word);
        state.saveAs('test1', 'test2');
        expect(state.file('test2')).toBe(word);
        state.file('test1', up);
        state.saveAs('test1', 'test2', true);
        expect(state.file('test2')).toBe(up);
    });

    it('return an error message when asked to saveAs a non-existant file',
       function() {
           var result = '';
           result = state.saveAs('test1', 'test2');
           expect(result).not.toBe('');
       });

    it('when saving "__new __file" as something else it should reset new file',
       function() {
           var nf = '__new __file', word = 'word';
           state.file(nf, word);
           expect(state.file(nf)).toBe(word);
           state.saveAs(nf, 'test');
           expect(state.file(nf)).toBe('');
       });

    it('should list sandbox files', function() {
        var files = [{n: 'test1', v: 1}, {n: 'test2', v: 2},
            {n: 'test3', v: 3}];

        files.forEach(function(file) { state.file(file.n, file.v); });
        expect(state.list().length).toBe(3);
    });

    it('should list sandbox files by naturally sorted name', function() {
        var files = [{n: 'test1', v: 1}, {n: 'test10', v: 2},
            {n: 'test3', v: 3}, {n: 'test100', v: -352}];

        files.forEach(function(file) { state.file(file.n, file.v); });
        expect(state.list()[0]).toBe('test1');
        expect(state.list()[1]).toBe('test3');
        expect(state.list()[2]).toBe('test10');
        expect(state.list()[3]).toBe('test100');
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
    // Start a new describe block
});
