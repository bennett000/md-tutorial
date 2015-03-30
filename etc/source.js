/**
 * file: source.js
 * Created by michael on 28/03/15.
 */

// This file describes how to build md-tutorial
/*global __dirname, module */
var source = {
    root: __dirname + '/../src/',
    js: [
        'js/md-tutorial.js'
    ],
    lib: [
        'lib/angular.min.js',
        'lib/angular-route.min.js',
        'lib/marked.min.js'
    ],
    ts: [
        'src/ts/md-tutorial.ts',
        'src/ts/applet-selector.ts',
        'src/ts/input-handlers.ts',
        'src/ts/controllers.ts',
        'src/ts/throttle.ts',
        'src/ts/markdown-services/markdown.ts'
    ],
    staticFiles: [
        '!*.template.html', // why won't grunt copy ignore this? @todo dig
        '*.ico',
        'html/**/*.html',
        '**/*.png',
        '**/*.svg'
    ],
    absoluteJS: absoluteJS,
    absoluteLib: absoluteLib,
    absoluteScripts: absoluteScripts,
    relativeScripts: relativeScripts,
    debugScriptTags: debugScriptTags,
    productionScriptTags: productionScriptTags
};

/**
 * @type {{root: string, js: string[], lib: string[], absoluteJS: absoluteJS, absoluteLib: absoluteLib, absoluteScripts: absoluteScripts, debugScriptTags: debugScriptTags, productionScriptTags: productionScriptTags}}
 */
module.exports = source;

/**
 * @param {string} path
 * @return {string}
 */
function mapRoot(path) {
    'use strict';

    return source.root + path;
}

/**
 * @return {Array.<string>}
 */
function absoluteJS() {
    'use strict';

    return source.js.map(mapRoot);
}


/**
 * @return {Array.<string>}
 */
function absoluteLib() {
    'use strict';

    return source.lib.map(mapRoot);
}

/**
 * @return {Array.<string>}
 */
function absoluteScripts() {
    'use strict';

    return absoluteLib().concat(absoluteJS());
}

/**
 *  @return {Array.<string>}
 */
function relativeScripts() {
    'use strict';

    return source.lib.concat(source.js);
}

/**
 *  @param {string} src
 *  @return {string}
 */
function makeScriptTag(src) {
    'use strict';

    return '<script src="' + src + '"></script>';
}

/**
 * @return {string}
 */
function debugScriptTags() {
    'use strict';

    var result = '';
    source.relativeScripts().forEach(function (script) {
        result += makeScriptTag(script) + '\n';
    });
    return result;
}

/**
 * @return {string}
 */
function productionScriptTags() {
    'use strict';

    return makeScriptTag('/md-tutorial.min.js');
}

