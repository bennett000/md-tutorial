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

             beforeEach(function() {
                 module('md-tutorial');
             });

             it('identity/control', function() {
                 expect(true).toBe(true);
             });
         });
