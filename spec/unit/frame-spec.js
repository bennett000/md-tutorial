/**
 * file: frame-spec.js
 * Created by michael on 28/03/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
 it, module,inject, workular */


describe('Frame is a simple directive that represents the "root" of the' +
         'application - it\'s function is to keep the index.html small',
         function() {
             'use strict';

             var el, scope, compile, defaultData,
                 defaultTemplate = '<mdt-frame></mdt-frame>';

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
