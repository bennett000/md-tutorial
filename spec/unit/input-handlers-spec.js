/**
 * file: input-handlers-spec.js
 * Created by michael on 30/03/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
 it, module,inject, workular */


describe('Tap/Click', function() {
    'use strict';

    var el, scope, compile, defaultData,
        defaultTemplate = '<div mdt-tap="doStuff(\'hi\')"></div>';

    function create(d, tpl) {
        scope.data = d || defaultData;
        return compile(tpl || defaultTemplate)(scope);
    }

    beforeEach(function() {
        module('md-tutorial');
        inject(function($rootScope, $compile) {
            scope = $rootScope;
            compile = $compile;
            scope.doStuff = function(val) { return val; };
        });
    });

    it('render expected output', function() {
        el = create();
        expect(el.text()).toBe('');
    });

    it('doStuff function should trigger on click', function() {
        spyOn(scope, 'doStuff');
        el = create();
        el.triggerHandler('mousedown');
        el.triggerHandler('mouseup');
        expect(scope.doStuff).toHaveBeenCalled();
    });

    it('doStuff function should trigger on a valid touchend', function() {
        spyOn(scope, 'doStuff');
        el = create();
        el.triggerHandler('touchstart');
        expect(scope.doStuff).not.toHaveBeenCalled();
        el.triggerHandler('touchend');
        expect(scope.doStuff).toHaveBeenCalled();
    });

    it('doStuff function should not trigger on multi-touch I', function() {
        spyOn(scope, 'doStuff');
        el = create();
        el.triggerHandler({ type:'touchstart', clientX: 0 });
        expect(scope.doStuff).not.toHaveBeenCalled();
        el.triggerHandler({ type:'touchstart', clientX: 5, touches: [1, 2] });
        el.triggerHandler('touchend');
        expect(scope.doStuff).not.toHaveBeenCalled();
    });

    it('doStuff function should not trigger on multi-touch II', function() {
        spyOn(scope, 'doStuff');
        el = create();
        el.triggerHandler({ type:'touchstart', clientX: 0 });
        expect(scope.doStuff).not.toHaveBeenCalled();
        el.triggerHandler({ type:'touchstart', clientX: 5,
                              changedTouches: [1, 2] });
        el.triggerHandler('touchend');
        expect(scope.doStuff).not.toHaveBeenCalled();
    });

    it('doStuff function should not trigger on click *and* scroll (H)',
       function() {
           spyOn(scope, 'doStuff');
           el = create();
           scope.$digest();
           el.triggerHandler({type: 'mousedown', clientX: 0, clientY: 0});
           el.triggerHandler({type: 'mouseup', clientX: 16, clientY: 0});
           expect(scope.doStuff).not.toHaveBeenCalled();
       });

    it('doStuff function should not trigger on click *and* scroll (V)',
       function() {
           spyOn(scope, 'doStuff');
           el = create();
           scope.$digest();
           el.triggerHandler({type: 'mousedown', clientX: 0, clientY: 0});
           el.triggerHandler({type: 'mouseup', clientX: 0, clientY: 16});
           expect(scope.doStuff).not.toHaveBeenCalled();
       });

});
