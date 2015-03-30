/**
 * file: selector-spec.js
 * Created by michael on 29/03/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs, it, module,inject, workular */


describe('Mode selector', function() {
    'use strict';

    var el, scope, compile, defaultData,
        defaultTemplate = '<mdt-applet-selector></mdt-applet-selector>';

    function create(d, tpl) {
        scope.data = d || defaultData;
        return compile(tpl || defaultTemplate)(scope);
    }

    beforeEach(function() {
        module('md-tutorial');
        inject(function($rootScope, $compile) {
            scope = $rootScope;
            compile = $compile;
            scope.select = function () {};
        });
    });

    it('render expected output', function() {
        el = create();
        expect(el.text()).toBe('{{ selector.label }}');
    });

    it('select function should trigger on click', function() {
        spyOn(scope, 'select');
        el = create();
        el.triggerHandler('mousedown');
        el.triggerHandler('mouseup');
        expect(scope.select).toHaveBeenCalled();
    });
});

describe('Mode selectors', function() {
    'use strict';

    var el, scope, compile, defaultData,
        defaultTemplate = '<mdt-applet-selectors></mdt-applet-selectors>';

    function create(d, tpl) {
        scope.data = d || defaultData;
        return compile(tpl || defaultTemplate)(scope);
    }

    beforeEach(function() {
        module('md-tutorial');
        inject(function($rootScope, $compile) {
            scope = $rootScope;
            compile = $compile;
        });
    });

    it('render expected output', function() {
        el = create();
        expect(el.text()).toBe('');
    });
});
