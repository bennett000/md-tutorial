/**
 * file: storage-spec.js
 * Created by michael on 06/04/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
 it, module,inject, workular, afterEach */


describe('confirmation service', function() {
    'use strict';
    var cs;

    beforeEach(function() {
        module('md-tutorial');
        inject(function(mdtConfirmation) {
            cs = mdtConfirmation;
        });
    });

    it('should register callbacks with on, and trigger with resolve',
       function() {
           var done = false;
           cs.on(function() {
               done = true;
           });
           cs.resolve();
           expect(done).toBe(true);
       });

    it('on should not care if there is no callback given', function() {
        expect(cs.on()).toBeUndefined();
    });
});
