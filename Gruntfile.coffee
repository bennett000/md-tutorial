# @deprecated
getConfig = require './scripts/load-config.js'
source = require './etc/source.js'
jsMinName = 'md-tutorial.min.js'
jsIntermediate = 'src/js/' + jsMinName
jsBuild = 'build/' + jsMinName

module.exports = (grunt) ->
  config = getConfig()
  buildPath = grunt.option('buildPath') || ''

  grunt.initConfig

    # closure compiler will prep for the build
    'closure-compiler':
      mdTutorial:
        closurePath: config.pathCC
        js: source.absoluteJS()
        jsOutputFile: jsIntermediate
        maxBuffer: 500
        noreport: true
        options:
          compilation_level: 'SIMPLE_OPTIMIZATIONS'
          language_in: 'ECMASCRIPT5_STRICT'
          externs: 'etc/externs/angular-1.3.js'
          angular_pass: true

    # Copy assets
    copy:
      build:
        expand: true
        src: source.staticFiles
        dest: 'build/'
        cwd: 'src/'

    # Runs the e2e suite - web driver must already be running!
    protractor:
      mdTutorial:
        configFile: 'etc/protractor.conf.js'
        keepAlive: true
        noColor: false


  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-jasmine-node-coverage'
  grunt.loadNpmTasks 'grunt-protractor-runner'
  grunt.loadNpmTasks 'grunt-closure-compiler'


  grunt.registerTask 'e2e', 'End to end tests', ['protractor']
  grunt.registerTask 'test-all', 'End to end tests', ['protractor']

  grunt.registerTask 'build', 'Build The Project', ['copy']

