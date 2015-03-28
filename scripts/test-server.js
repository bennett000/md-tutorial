/**
 * file: test-server.js
 * Created by michael on 28/03/15.
 */

/*global require, process, console, __dirname, JSON */


/* @todo use node's path to make these agnostic */
/** @type {Object} */
var connect = require('connect'),
/** @type {function(...)} */
getConfig = require('./load-config.js'),
/** @type {Object} */
serveStatic = require('serve-static'),
/** @const */
PATH_WWW = __dirname + '/../src/',
/** @type {boolean} */
isEnding = false;

main();

// Functions below


function main() {
    'use strict';

    var config = getConfig(),
        s = connect().use(serveStatic(PATH_WWW)).listen(+config.port);
    console.log('');
    console.log('md-tutorial test server listening on ', +config.port);

    function kill() {
        gracefulExit(s);
    }

    process.on('SIGTERM', kill);
    process.on('SIGINT', kill);
}

function bye() {
    'use strict';

    console.log('Bye');
    console.log('');
}

/**
 * @param {Error=} err
 */
function onServerClose(err) {
    'use strict';

    if (err) {
        console.log('Finished With Errors: ', err.message);
        console.log('');
        process.exit(1);
        return;
    }
    bye();
    process.exit(0);
}

/**
 * @param {Object} server
 */
function gracefulExit(server) {
    'use strict';

    if (!server) {
        bye();
        process.exit(0);
        return;
    }

    if (isEnding) {
        console.log('Terminating ASAP');
        console.log('');
        process.exit(0);
        return;
    }
    isEnding = true;

    server.close(onServerClose);
}

