#
getConfig = require './scripts/load-config.js'
source = require './etc/source.js'

module.exports = (grunt) ->
  config = getConfig

  grunt.initConfig
    typescript:
      main:
        src: ['src/ts/md-tutorial.ts']
        dest: 'src/js/md-tutorial.js'
        options:
          target: 'es5'
          basePath: 'src/ts/'
          sourceMap: true
          declaration: false

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

    karma:
      unit:
        configFile: 'etc/karma.conf.js'
        singleRun: true,
        browsers: ['Firefox']

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-jasmine-node-coverage'
  grunt.loadNpmTasks 'grunt-karma'
  grunt.loadNpmTasks 'grunt-protractor-runner'
  grunt.loadNpmTasks 'grunt-closure-compiler'
  grunt.loadNpmTasks 'grunt-typescript'
  grunt.loadNpmTasks 'grunt-text-replace'



  grunt.registerTask 'bootstrap', 'Generate index.html', ['replace', 'compile']
  grunt.registerTask 'compile', 'Compile TS to JS', ['typescript']
  grunt.registerTask 'test', 'Run unit tests', ['compile', 'karma']
  grunt.registerTask 'build', 'Build The Project', ['compile']
  #grunt.registerTask 'default', ['prepare']
