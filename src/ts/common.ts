///<reference path="./md-tutorial.ts" />
module mdTutorial {
    app.factory('mdtSafecall', safeCall);

    var rx = /(\d+)|(\D+)/g,
        /** @const */
        rd = /\d+/;
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
