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

             var el, scope, compile, ms,
                 defaultTemplate = '<mdt-frame></mdt-frame>',
                 menus;

             function create() {
                 return compile(defaultTemplate)(scope);
             }

             beforeEach(function() {
                 module('html/frame.html');
                 module('html/applet-selector.html');
                 module('html/sandbox.html');
                 module('html/sandbox-directive.html');
                 module('html/prompt-bool.html');
                 module('html/prompt-input.html');
                 module('html/prompt-file.html');
                 module('md-tutorial');
                 inject(function($rootScope, $compile, mdtMenus, mdtMenuState) {
                     scope = $rootScope;
                     compile = $compile;
                     menus = mdtMenus;
                     ms = mdtMenuState;
                 });
             });

             it('Should have all the default buttons', function() {
                 el = create();
                 scope.$digest();
                 var results = el.text().split(' ').map(function (el) {
                        return el.trim();
                 });
                 Object.keys(menus).forEach(function(id) {
                     if (menus[id].toggle) { return; }
                    expect(results.indexOf(menus[id].label)).not.toBe(-1);
                 });
             });

             it('should put a toggle string on scope', function() {
                 el = create();
                 scope.$digest();
                 expect(typeof el.isolateScope().toggle).toBe('string');
             });

             it('should destroy', function() {
                 /** @todo find a better way of tracking this */
                 el = create();
                 scope.$digest();
                 var start = Object.keys(ms.__callbacks.toggle).length, end;
                 scope.$destroy();
                 scope.$digest();
                 end = Object.keys(ms.__callbacks.toggle).length;
                 expect(end < start).toBe(true);
             });
         });
