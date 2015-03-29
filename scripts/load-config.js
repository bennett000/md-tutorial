/**
 * file: load-config.js
 * Created by michael on 28/03/15.
 */

/*global module, require, __dirname */
/** @type {Object} */
var fs = require('fs'),
/** @const */
CONFIG_NAME = 'project-config.json',
/** @const */
DEFAULT_CONFIG_NAME = 'project-config.json.template',
/** @const */
FILE_DEFAULT_CONFIG = __dirname + '/../' + DEFAULT_CONFIG_NAME,
/** @const */
FILE_CONFIG = __dirname + '/../' + CONFIG_NAME;

/**
 * @type {function(...)}
 */
module.exports = getConfig;

/**
 * @param {Object} c
 * @return {Object}
 */
function validateConfig(c) {
    'use strict';
    c = c || {};

    c.pathCC = c.pathCC || '/usr/local/lib/closure-compiler';
    c.port = +c.port || 31415;
    c.host = c.host || '127.0.0.1';
    c.protocl = c.protocl === 'https://' ? c.protocol : 'http://';

    return c;
}

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

    return validateConfig(config);
}
