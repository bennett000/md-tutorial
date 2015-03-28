/**
 * file: test-server.js
 * Created by michael on 28/03/15.
 */

/*global require, process, console, __dirname, JSON */


/* @todo use node's path to make these agnostic */
/** @type {Object} */
var connect = require('connect'),
/** @type {Object} */
serveStatic = require('serve-static'),
/** @type {Object} */
fs = require('fs'),
/** @const */
PATH_WWW = __dirname + '/../src/',
/** @const */
CONFIG_NAME = 'project-config.json',
/** @const */
DEFAULT_CONFIG_NAME = 'project-config.json.template',
/** @const */
FILE_DEFAULT_CONFIG = __dirname + '/../' + DEFAULT_CONFIG_NAME,
/** @const */
FILE_CONFIG = __dirname + '/../' + CONFIG_NAME,
/** @type {boolean} */
isEnding = false;

main();

// Functions below

/**
 * @param {string} file
 * @return {*}
 */
function safeGetFile(file) {
    'use strict';
    try {
        return fs.readFileSync(file, 'utf-8');
    } catch (err) {
        return null;
    }
}

/**
 * @param {string} strToParse
 * @return {*}
 */
function safeParse(strToParse) {
    'use strict';

    try {
        return JSON.parse(strToParse);
    } catch (error) {
        return null;
    }
}

/**
 * @throws {ReferenceError}
 * @return {*}
 */
function getConfig() {
    'use strict';

    var config = safeGetFile(FILE_CONFIG);

    if (!config) {
        config = safeGetFile(FILE_DEFAULT_CONFIG);
    }

    if (!config) {
        throw new ReferenceError('md-tutorial server: cannot find config');
    }

    config = safeParse(config);

    if (!config) {
        throw new ReferenceError('md-tutorial server: cannot parse config');
    }

    return config;
}

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

