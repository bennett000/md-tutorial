/**
 * file: storage-spec.js
 * Created by michael on 06/04/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
 it, module,inject, workular, afterEach */


describe('menu functions', function() {
    'use strict';
    var mf, loc, ms, w, sandboxState, scope, prompt, to;

    beforeEach(function() {
        module('md-tutorial', function($provide) {
            $provide.value('$window', {location: {href: 'dummy'}});
        });
        inject(function(mdtMenuFunctions, $location, mdtMenuState, $timeout,
                        $window, mdtSandboxState, $rootScope,
                        mdtPromptService, localStorage) {
            mf = mdtMenuFunctions;
            loc = $location;
            ms = mdtMenuState;
            w = $window;
            sandboxState = mdtSandboxState;
            scope = $rootScope;
            prompt = mdtPromptService;
            to = $timeout;
            localStorage.removeAll();
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

    it('prompt load should prompt for files', function() {
        spyOn(prompt, 'file').and.callThrough();
        mf.promptLoad();
        expect(prompt.file).toHaveBeenCalled();
    });

    it('load should load files', function() {
        spyOn(sandboxState, 'current').and.callThrough();
        mf.promptLoad();
        prompt.emit('provideFile', 'test');
        scope.$apply();
        to.flush();
        expect(sandboxState.current).toHaveBeenCalled();
    });

    it('promptNew should change the current file if it is not "the new file"',
       function() {
           sandboxState.current('tst');
           spyOn(sandboxState, 'current').and.callThrough();
           mf.promptNew();
           expect(sandboxState.current).toHaveBeenCalled();
       });

    it('promptNew should ask for overwrite if it is clearing "the new file"',
       function() {
           sandboxState.file('__new __file', 'data');
           sandboxState.current('__new __file');
           spyOn(prompt, 'bool').and.callThrough();
           mf.promptNew();
           expect(prompt.bool).toHaveBeenCalled();
       });

    it('promptNew should overwrite if it is okay to clear "the new file"',
       function() {
           sandboxState.file('__new __file', 'data');
           sandboxState.current('__new __file');
           spyOn(sandboxState, 'file').and.callThrough();
           mf.promptNew();
           prompt.emitSync('provideBool', true);
           scope.$apply();
           expect(sandboxState.file.calls.count()).toBe(2);
       });

    it('promptNew should not overwrite if it is not okay to clear ' +
       '"the new file"', function() {
        sandboxState.file('__new __file', 'data');
        sandboxState.current('__new __file');
        spyOn(sandboxState, 'file').and.callThrough();
        mf.promptNew();
        prompt.emitSync('provideBool', false);
        scope.$apply();
        expect(sandboxState.file.calls.count()).toBe(1);
    });

    it('promptSaveAs should save if new file does not exist', function() {
        spyOn(sandboxState, 'file').and.callThrough();
        mf.promptSaveAs();
        prompt.emitSync('provideInput', 'stuff');
        scope.$apply();
        expect(sandboxState.file).toHaveBeenCalled();
    });

    it('promptSaveAs should overwrite if given the okay', function() {
        sandboxState.file('a', 'test');
        sandboxState.current('a');
        sandboxState.file('b', 'data');
        mf.promptSaveAs();
        prompt.emitSync('provideInput', 'b');
        to.flush();
        scope.$apply();
        prompt.emitSync('provideBool', true);
        to.flush();
        scope.$apply();
        expect(sandboxState.file('b')).toBe('test');
    });

    it('promptSaveAs should not overwrite if not given the okay', function() {
        sandboxState.file('a', 'test');
        sandboxState.current('a');
        sandboxState.file('b', 'data');
        mf.promptSaveAs();
        prompt.emitSync('provideInput', 'b');
        to.flush();
        scope.$apply();
        prompt.emitSync('provideBool', false);
        to.flush();
        scope.$apply();
        expect(sandboxState.file('b')).toBe('data');
    });

    it('promptRemove should prompt for a boolean if file is "new file"', function() {
        sandboxState.file('__new __file', 'data');
        sandboxState.current('__new __file');
        spyOn(prompt, 'bool').and.callThrough();
        mf.remove();
        expect(prompt.bool).toHaveBeenCalled();
    });

    it('promptRemove should not remove if not given the okay', function() {
        sandboxState.file('test', 'data');
        sandboxState.current('test');
        mf.remove();
        prompt.emitSync('provideBool', false);
        scope.$apply();
        to.flush();
        expect(sandboxState.file('test')).toBe('data');
    });

    it('promptRemove should remove if given the okay', function() {
        sandboxState.file('test', 'data');
        sandboxState.current('test');
        mf.remove();
        prompt.emitSync('provideBool', true);
        scope.$apply();
        to.flush();
        expect(sandboxState.file('test')).toBeFalsy();
    });
});
