#
getConfig = require './scripts/load-config.js'
source = require './etc/source.js'
jsMinName = 'md-tutorial.min.js'
jsIntermediate = 'src/js/' + jsMinName
jsBuild = 'build/' + jsMinName

console.log('ts: ' + source.ts.join(','))

module.exports = (grunt) ->
  config = getConfig()

  grunt.initConfig

    # Compiles typescript to js for testing, and distribution
    typescript:
      main:
        src: source.ts
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

    # Concat will do most of the building
    concat:
      buildJS:
        src: source.absoluteLib().concat [jsIntermediate]
        dest: jsBuild

    # Lint the code - we are not savages
    tslint:
      options:
        configuration: grunt.file.readJSON 'etc/tslint.json'
      files:
        src: ['src/ts/**/*.ts']

    jshint:
      all: ['spec/**/*.js', 'scripts/**/*.js']

    coffeelint:
      app: ['Gruntfile.coffee']

    # Build CSS
    compass:
      debug:
        options:
          cssDir: 'src/css'
          sassDir: 'src/scss'
          environment: 'development'
          force: true
      build:
        options:
          cssDir: 'build/css'
          sassDir: 'src/scss'
          environment: 'production'
          force: true

    # Copy assets
    copy:
      build:
        expand: true
        src: source.staticFiles
        dest: 'build/'
        cwd: 'src/'

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
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-jasmine-node-coverage'
  grunt.loadNpmTasks 'grunt-karma'
  grunt.loadNpmTasks 'grunt-protractor-runner'
  grunt.loadNpmTasks 'grunt-closure-compiler'
  grunt.loadNpmTasks 'grunt-typescript'
  grunt.loadNpmTasks 'grunt-text-replace'
  grunt.loadNpmTasks 'grunt-tslint'
  grunt.loadNpmTasks 'grunt-coffeelint'


  grunt.registerTask 'e2e', 'End to end tests', ['protractor']
  grunt.registerTask 'test', 'Run unit tests', ['compile', 'karma']
  grunt.registerTask 'compile', 'Compile TS to JS', ['lint', 'typescript']
  grunt.registerTask 'test-all', 'End to end tests', ['karma', 'protractor']
  grunt.registerTask 'bootstrap', 'Generate index.html', ['replace', 'compile',
                                                          'compass']

  grunt.registerTask 'build', 'Build The Project', ['bootstrap', 'compile',
                                                    'concat']

  grunt.registerTask 'lint', 'Lint the project', ['tslint', 'jshint',
                                                  'coffeelint']
  #grunt.registerTask 'default', ['prepare']
