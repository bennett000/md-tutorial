/**
 * file: selector-spec.js
 * Created by michael on 29/03/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs, it, module,inject, workular */


describe('Mode selector', function() {
    'use strict';

    var el, scope, compile,
        defaultTemplate = '<mdt-applet-selector></mdt-applet-selector>';

    function create(tpl) {
        return compile(tpl || defaultTemplate)(scope);
    }

    //beforeEach(module('html/applet-selector.html'));

    beforeEach(function() {
        module('html/applet-selector.html');
        module('md-tutorial');
        inject(function($rootScope, $compile) {
            scope = $rootScope;
            compile = $compile;
            scope.select = function (a) { return a; };
            scope.selector = {
                path: 'a',
                label: 'b',
                icon: 'c'
            };
        });
    });

    it('render expected output', function() {
        el = create();
        scope.$digest();
        expect(el.text().trim()).toBe('b');
    });

    it('select function should trigger on click', function() {
        spyOn(scope, 'select');
        el = create();
        scope.$digest();
        el.triggerHandler('mousedown');
        el.triggerHandler('mouseup');
        expect(scope.select).toHaveBeenCalled();
    });
});

describe('Mode selectors', function() {
    'use strict';

    var el, scope, compile, mf, ms,
        defaultTemplate = '<mdt-applet-selectors></mdt-applet-selectors>',
        essentialScopeSelectorProperties = ['label', 'args', 'fn', 'icon'];

    function create(d, tpl) {
        return compile(tpl || defaultTemplate)(scope);
    }

    beforeEach(function() {
        module('html/applet-selector.html');
        module('md-tutorial');
        inject(function($rootScope, $compile, mdtMenuFunctions, mdtMenuState) {
            mf = mdtMenuFunctions;
            ms = mdtMenuState;
            scope = $rootScope;
            compile = $compile;
        });
    });

    it('render expected output', function() {
        el = create();
        scope.$digest();
        expect(el.text()).toBe('');
    });

    it('select function should do nothing if there is no corresponding menu' +
       'function', function() {
        el = create();
        scope.$digest();
        expect(el.isolateScope().select()).toBeUndefined();
    });

    it('select function should call corresponding menu function', function() {
        el = create();
        scope.$digest();
        spyOn(mf, 'go').and.callThrough();
        el.isolateScope().select('go', 'places', 'label');
        expect(mf.go).toHaveBeenCalledWith('places');
    });

    it('select function should set corresponding state', function() {
        el = create();
        scope.$digest();
        spyOn(ms, 'current').and.callThrough();
        el.isolateScope().select('go', 'places', 'label');
        expect(ms.current).toHaveBeenCalledWith('label');
    });

    it('selectors on scope should only have essential properties', function() {
        el = create();
        scope.$digest();
        el.isolateScope().selectors.forEach(function(selector) {
            expect(essentialScopeSelectorProperties.indexOf(selector)).toBe(-1);
        });
    });
});
