/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
it, module,inject */


describe('Throttle function', function () {
    'use strict';
    beforeEach(function () {
        module('md-tutorial');
    });

    it('should be a function', inject(function (throttle) {
        expect(typeof throttle).toBe('function');
    }));

    it('should return a function', inject(function (throttle) {
        expect(typeof throttle()).toBe('function');
    }));

    it('should run a function only once in a given time period', inject(function (throttle) {
        var count = 0,
            fn = throttle(function () {
                count += 1;
            }, 10);

        fn();
        fn();
        fn();
        fn();
        expect(count).toBe(1);
    }));

    it('should run a function only once in a given time period, and ignore the first call', inject(function (throttle, $timeout) {
        var count = 0,
            fn = throttle(function () {
                count += 1;
            }, 10, { leading: false });

        fn();
        fn();
        fn();
        fn();
        expect(count).toBe(0);
        $timeout.flush();
        expect(count).toBe(1);
    }));

    it('should reset periods', inject(function (throttle, $timeout) {
        var count = 0,
            fn = throttle(function () {
                count += 1;
            }, 10);

        fn();
        fn();
        expect(count).toBe(1);
        $timeout.flush();
        fn();
        fn();
        expect(count).toBe(2);
    }));
});

describe('Debounce function', function () {
    'use strict';

    beforeEach(function () {
        module('md-tutorial');
    });

    beforeEach(module(function($provide) {
        $provide.factory('throttleNow', function (){
            var now = 0;

            function fakeNow() {
                return now;
            }

            fakeNow.set = function (timestamp) {
                now = timestamp;
            };

            return fakeNow;
        });
    }));

    it('should be a function', inject(function (debounce) {
        expect(typeof debounce).toBe('function');
    }));

    it('should return a function', inject(function (debounce) {
        expect(typeof debounce()).toBe('function');
    }));

    it('should run a function only once _after_ a period of inactivity ', inject(function (debounce, $timeout, throttleNow) {
        var count = 0,
            fn = debounce(function () {
                count += 1;
            }, 100);

        fn();
        fn();
        fn();
        fn();
        expect(count).toBe(0);
        throttleNow.set(150);
        $timeout.flush();
        expect(count).toBe(1);
    }));

    it('should internally reset itself to ensure that it is only called once at the end ', inject(function (debounce, $timeout, throttleNow) {
        throttleNow.set(1000);
        var count = 0,
            fn = debounce(function () {
                count += 1;
            }, 100);

        fn();
        fn();
        expect(count).toBe(0);
        throttleNow.set(1001);
        $timeout.flush();
        fn();
        expect(count).toBe(0);
        throttleNow.set(1050);
        $timeout.flush();
        fn();
        expect(count).toBe(0);
        throttleNow.set(1150);
        $timeout.flush();
        expect(count).toBe(1);
    }));

    it('should be runnable immediately ', inject(function (debounce) {
        var count = 0,
            fn = debounce(function () {
                count += 1;
            }, 100, true);

        fn();
        fn();
        fn();
        fn();
        expect(count).toBe(1);
    }));
});
