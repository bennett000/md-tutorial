/**
 * file: storage-spec.js
 * Created by michael on 06/04/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
 it, module,inject, workular, afterEach, angular */


describe('sandbox controller', function() {
    'use strict';

    var $c, scope, ms;

    beforeEach(function() {
        module('md-tutorial');
        inject(function ($controller, $rootScope, mdtMenuState) {
            $c = $controller;
            scope = $rootScope;
            ms = mdtMenuState;
        });
    });

    it('setToggles should call menu state toggle', function() {
        spyOn(ms, 'toggle').and.callThrough();
        var s = scope.$new(), c = $c('Sandbox', {$scope: s});
        c.setToggles();
        expect(ms.toggle).toHaveBeenCalled();
    });

});

describe('sandbox directive', function() {
    'use strict';

    var el, scope, compile,
        defaultTemplate = '<mdt-sandbox></mdt-sandbox>',
        state, ls;

    function create(tpl) {
        return compile(tpl || defaultTemplate)(scope);
    }

    beforeEach(function() {
        module('html/sandbox-directive.html');
        module('md-tutorial');
        inject(function($rootScope, $compile, mdtSandboxState, localStorage) {
            scope = $rootScope;
            compile = $compile;
            state = mdtSandboxState;
            ls = localStorage;
        });
    });

    afterEach(function() {
        ls.removeAll();
    });

    it('should transclude input', function() {
        var el = create('<mdt-sandbox>hi</mdt-sandbox>');
        scope.$digest();
        expect(input(el)).toBe('hi');
    });

    it('should load existing state', function() {
        state.file('test', 'word');
        var el = create('<mdt-sandbox mdt-file="test"></mdt-sandbox>');
        scope.$digest();
        expect(input(el)).toBe('word');
    });

    it('should set state on update', function() {
        state.file('test', 'word');
        var el = create('<mdt-sandbox mdt-file="test"></mdt-sandbox>'),
        changes = 'ch-changes', done = false;
        scope.$digest();
        el.isolateScope().md.input = changes;
        el.isolateScope().md.update().then(function () {
            expect(state.file('test')).toBe(changes);
            done = true;
        }, function (err) {
            expect(err.message).toBeUndefined();
            done = true;
        });
        scope.$apply();
        expect(done).toBe(true);
    });

    it('should load managed state', function() {
        state.file('__new __file', 'word');
        var el = create('<mdt-sandbox mdt-current="true"></mdt-sandbox>');
        scope.$digest();
        expect(input(el)).toBe('word');
    });

    it('should set managed state on update', function() {
        state.file('__new __file', 'word');
        var el = create('<mdt-sandbox mdt-current="true"></mdt-sandbox>'),
            changes = 'ch-changes', done = false;
        scope.$digest();
        el.isolateScope().md.input = changes;
        el.isolateScope().md.update().then(function () {
            expect(state.file('__new __file')).toBe(changes);
            done = true;
        }, function (err) {
            expect(err.message).toBeUndefined();
            done = true;
        });
        scope.$apply();
        expect(done).toBe(true);
    });

    // get the markdown input child text
    function input(val) {
        return angular.element(
        angular.element(val.children()[0]).children()[0]
        ).val();
    }

    // get the markdown output child text
    function output(val) {
        return angular.element(val.children()[1]).text();
    }
});

