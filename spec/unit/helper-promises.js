
/**
 * Fails a promise
 * @param {function(...)} done
 * @return {function(...)}
 */
function failPromise(done) {
    'use strict';

    /*global expect*/
    /**
     * @param {Error} err
     */
    function onFail(err) {
        expect(err.message).toBe(undefined);
        done();
    }
    return onFail;
}
