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
PATH_WWW_DEBUG = __dirname + '/../src/',
/** @const */
PATH_WWW_BUILD = __dirname + '/../build/',
/** @type {boolean} */
isEnding = false;

main();

// Functions below


function main() {
    'use strict';

    var config = getConfig(),
        path = checkProduction() ? PATH_WWW_BUILD : PATH_WWW_DEBUG,
        s = connect().use(serveStatic(path)).listen(+config.port);
    console.log('');
    console.log('md-tutroial test server');
    console.log('  use -p or --production to test built version');
    console.log('');
    console.log('md-tutorial test server listening on ', +config.port);
    console.log('serving files from ', path);

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
 * @return {boolean}
 */
function checkProduction() {
    'use strict';

    if (process.argv.indexOf('-p') > 0) {
        return true;
    }
    if (process.argv.indexOf('--production') > 0) {
        return true;
    }
    return false;
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

