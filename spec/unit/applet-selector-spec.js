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
        expect(el.text()).toBe('');
    });

    /** @todo debug this, and the ng html to js karma plugin
    it('select function should trigger on click', function($templateCache) {
        spyOn(scope, 'select');
        el = create();
        el.triggerHandler('mousedown');
        el.triggerHandler('mouseup');
        expect(scope.select).toHaveBeenCalled();
    });
    */
});

describe('Mode selectors', function() {
    'use strict';

    var el, scope, compile,
        defaultTemplate = '<mdt-applet-selectors></mdt-applet-selectors>';

    function create(d, tpl) {
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
