/*global require, process, console */
var spawn = require('child_process').spawn,
    bower =  spawn('bower', ['install'], { stdio: 'inherit' });

bower.on('exit', function () {
    'use strict';

    var grunt = spawn('grunt', ['bootstrap'], { stdio: 'inherit' });
    grunt.on('error', onError);
    grunt.on('exit', function () {
        process.exit(0);
    });
});

bower.on('error', onError);

function onError(err) {
    'use strict';

    console.log('Error: ' + err.message);
    process.exit(1);
}
