///<reference path="./main.ts" />
module mdTutorial {
    app.value('mdtSafeCall', safeCall).
        value('mdtNaturalSort', naturalSort).
        factory('mdtMakeListener', makeListenerFactory);

    var rx = /(\d+)|(\D+)/g,
        /** @const */
        rd = /\d+/;


    /** @ngInject */
    function makeListenerFactory($timeout) {
        function makeListener(obj) {
            if (!(obj && typeof obj === 'object')) {
                return obj;
            }

            var callbacks = {};

            function on(message:string, cb:Function):Function {
                if (!message) {
                    return angular.noop;
                }
                if (typeof cb !== 'function') {
                    return angular.noop;
                }
                if (!callbacks[message]) {
                    callbacks[message] = {};
                }
                var id = Date.now().toString(16) + Math.random();
                callbacks[message][id] = cb;

                function remove():void {
                    delete callbacks[message][id];
                }

                return remove;
            }

            function args2array<T>(args, range):Array<T> {
                range = range || 0;
                return Array.prototype.slice.call(args, range);
            }

            function emitSync(message:string): void {
                if (!callbacks[message]) {
                    return;
                }
                var args = args2array(arguments, 1);
                Object.keys(callbacks[message]).forEach(function (id) {
                    safeCall(callbacks[message][id], args);
                });
            }

            function emit(message:string, ...rest:any[]):void {
                if (!callbacks[message]) {
                    return;
                }
                var args = args2array(arguments, 0);
                // async
                $timeout(function () {
                    emitSync.apply(null, args);
                }, 0);
            }

            if (obj.on) {
                obj._on = obj.on;
            }
            if (obj.emit) {
                obj._emit = obj.emit;
            }

            obj.on = on;
            obj.emit = emit;
            obj.emitSync = emitSync;
            obj.__callbacks = callbacks;

            return obj;
        }
        return makeListener;
    }

    export function safeCall(fn:Function, args?:Array<any>, ctext?:any) {
        try {
            ctext = ctext || null;
            return fn.apply(ctext, args);
        } catch (err) {
            // fail silent
        }
    }

    // thanks http://stackoverflow.com/questions/19247495/alphanumeric-sorting-an-array-in-javascript
    export function naturalSort(as:string, bs:string):number {
        as = as + '';
        bs = bs + '';
        var a = as.toLowerCase().match(rx),
            b = bs.toLowerCase().match(rx),
            a1, b1;

        while (a.length && b.length) {
            a1 = a.shift();
            b1 = b.shift();
            if (rd.test(a1) || rd.test(b1)) {
                if (!rd.test(a1)) {
                    return 1;
                }
                if (!rd.test(b1)) {
                    return -1;
                }
                if (a1 != b1) {
                    return a1 - b1;
                }
            } else if (a1 != b1) {
                return a1 > b1 ? 1 : -1;
            }
        }
        return a.length - b.length;
    }

}
