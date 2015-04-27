/**
 * file: storage-spec.js
 * Created by michael on 06/04/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
 it, module,inject, workular, afterEach */


describe('prompt service', function() {
    'use strict';
    var prompt, scope, to;

    beforeEach(function() {
        module('md-tutorial');

        inject(function(mdtPromptService, $timeout, $rootScope) {
            prompt = mdtPromptService;
            to = $timeout;
            scope = $rootScope;
        });
    });

    it('bool should notify that its event', function() {
        var done = false;
        prompt.on('bool', function(label, yes, no) {
            expect(label).toBe('label');
            expect(yes).toBe('yes');
            expect(no).toBe('no');
            done = true;
        });
        prompt.bool('label', 'yes', 'no');
        to.flush();
        expect(done).toBe(true);
    });

    it('input should notify that its event', function() {
        var done = false;
        prompt.on('input', function(label) {
            expect(label).toBe('label');
            done = true;
        });
        prompt.input('label');
        to.flush();
        expect(done).toBe(true);
    });

    it('file should notify that its event', function() {
        var done = false;
        prompt.on('file', function() {
            done = true;
        });
        prompt.file('label');
        to.flush();
        expect(done).toBe(true);
    });

    it('bool should set the state', function() {
        expect(prompt.state()).toBe('off');
        prompt.bool('l', 'y', 'n');
        expect(prompt.state()).toBe('bool');
    });

    it('input should set the state', function() {
        expect(prompt.state()).toBe('off');
        prompt.input('l', 'y', 'n');
        expect(prompt.state()).toBe('input');
    });

    it('file should set the state', function() {
        expect(prompt.state()).toBe('off');
        prompt.file('l', 'y', 'n');
        expect(prompt.state()).toBe('file');
    });

    it('prompts should only work if state is off', function() {
        var done = false;
        expect(prompt.state()).toBe('off');
        prompt.file('l', 'y', 'n');
        prompt.file().then(function() {
        }, function(err) {
            done = true;
        });
        to.flush();
        scope.$apply();
        expect(done).toBe(true);
    });

    it('input should temporarily provide a cancel listener', function() {
        var done = false;
        prompt.input().then(function() {
        }, function() {
            done = true;
        });
        prompt.emit('cancel');
        to.flush();
        scope.$apply();
        expect(done).toBe(true);

        // confirm it's one time
        done = false;
        prompt.emit('cancel');
        to.flush();
        scope.$apply();
        expect(done).toBe(false);
    });

    it('file should temporarily provide a cancel listener', function() {
        var done = false;
        prompt.file().then(function() {
        }, function() {
            done = true;
        });
        prompt.emit('cancel');
        to.flush();
        scope.$apply();
        expect(done).toBe(true);

        // confirm it's one time
        done = false;
        prompt.emit('cancel');
        to.flush();
        scope.$apply();
        expect(done).toBe(false);
    });

    it('bool should temporarily listen to provideBool', function() {
        var done = false;
        prompt.bool().then(function(val) {
            expect(val).toBe(true);
            done = true;
        });
        prompt.emit('provideBool', true);
        to.flush();
        scope.$apply();
        expect(done).toBe(true);

        // confirm it's one time
        done = false;
        prompt.emit('provideBool');
        to.flush();
        scope.$apply();
        expect(done).toBe(false);

    });

    it('input should temporarily listen to provideInput', function() {
        var done = false;
        prompt.input().then(function(val) {
            expect(val).toBe('test');
            done = true;
        });
        prompt.emit('provideInput', 'test');
        to.flush();
        scope.$apply();
        expect(done).toBe(true);

        // confirm it's one time
        done = false;
        prompt.emit('provideInput');
        to.flush();
        scope.$apply();
        expect(done).toBe(false);

    });

    it('file should temporarily listen to provideFile', function() {
        var done = false;
        prompt.file().then(function(val) {
            expect(val).toBe('test');
            done = true;
        });
        prompt.emit('provideFile', 'test');
        to.flush();
        scope.$apply();
        expect(done).toBe(true);

        // confirm it's one time
        done = false;
        prompt.emit('provideFile');
        to.flush();
        scope.$apply();
        expect(done).toBe(false);
    });
});
