#
getConfig = require './scripts/load-config.js'
source = require './etc/source.js'

module.exports = (grunt) ->
  config = getConfig

  grunt.initConfig

    # Compiles typescript to js for testing, and distribution
    typescript:
      main:
        src: ['src/ts/md-tutorial.ts']
        dest: 'src/js/md-tutorial.js'
        options:
          target: 'es5'
          basePath: 'src/ts/'
          sourceMap: true
          declaration: false

    # Used to build the index.html's
    replace:
      debug:
        src: ['src/index.template.html']
        dest: ['src/index.html']
        replacements: [{
          from: '###MANIFEST'
          to: ''
        }, {
          from: '###SOURCE'
          to: source.debugScriptTags()
        }]
      build:
        src: ['src/index.template.html']
        dest: ['build/index.html']
        replacements: [{
          from: '###MANIFEST'
          to: 'manifest="md-tutorial.appcache"'
        }, {
          from: '###SOURCE'
          to: source.productionScriptTags()
        }]

    # Lint the code - we are not savages
    tslint:
      options:
        configuration: grunt.file.readJSON 'etc/tslint.json'
      files:
        src: ['src/ts/**/*.ts']

    # Runs the unit test suite - generates coverage
    karma:
      unit:
        configFile: 'etc/karma.conf.js'
        singleRun: true,
        browsers: ['Firefox']

    # Runs the e2e suite - web driver must already be running!
    protractor:
      mdTutorial:
        configFile: 'etc/protractor.conf.js'
        keepAlive: true
        noColor: false


  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-jasmine-node-coverage'
  grunt.loadNpmTasks 'grunt-karma'
  grunt.loadNpmTasks 'grunt-protractor-runner'
  grunt.loadNpmTasks 'grunt-closure-compiler'
  grunt.loadNpmTasks 'grunt-typescript'
  grunt.loadNpmTasks 'grunt-text-replace'
  grunt.loadNpmTasks 'grunt-tslint'



  grunt.registerTask 'bootstrap', 'Generate index.html', ['replace', 'compile']
  grunt.registerTask 'compile', 'Compile TS to JS', ['tslint', 'typescript']
  grunt.registerTask 'e2e', 'End to end tests', ['protractor']
  grunt.registerTask 'test-all', 'End to end tests', ['karma', 'protractor']
  grunt.registerTask 'test', 'Run unit tests', ['compile', 'karma']
  grunt.registerTask 'build', 'Build The Project', ['compile']
  #grunt.registerTask 'default', ['prepare']
