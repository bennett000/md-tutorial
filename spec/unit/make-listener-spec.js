/**
 * file: storage-spec.js
 * Created by michael on 06/04/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
 it, module,inject, workular, afterEach */


describe('make listener', function() {
    'use strict';
    var ml, blank = {}, to;

    beforeEach(function() {
        module('md-tutorial');
        inject(function(mdtMakeListener, $timeout) {
            ml = mdtMakeListener;
            blank = ml(blank);
            to = $timeout;
        });
    });

    it('should only work given an object', function() {
        expect(ml(5)).toBe(5);
    });

    it('should be able to register update callbacks', function() {
        var done = false;
        blank.on('update', function() {
            done = true;
        });
        blank.emitSync('update');
        expect(done).toBe(true);
    });

    it('should be able to asynchronously emit', function() {
        var done = false;
        blank.on('update', function() {
            done = true;
        });
        blank.emit('update');
        to.flush();
        expect(done).toBe(true);
    });

    it('should be able to de-register update callbacks', function() {
        var done = false,
            remove = blank.on('update', function() {
                done = true;
            });
        remove();
        blank.emitSync('update');
        expect(done).toBe(false);
    });

    it('should return a noop given no message', function() {
        expect(blank.on()).toBe(angular.noop);
    });

    it('should return a noop given no callback', function() {
        expect(blank.on('word')).toBe(angular.noop);
    });

});
