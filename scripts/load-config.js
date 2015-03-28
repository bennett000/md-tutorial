/**
 * file: load-config.js
 * Created by michael on 28/03/15.
 */

/*global module*/
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

module.exports = getConfig;

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
