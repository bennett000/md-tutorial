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
        }, {
          from: '###BASE'
          to: ''
        }]
      build:
        src: ['src/index.template.html']
        dest: ['build/index.html']
        replacements: [{
          from: '###MANIFEST'
          to: '' #'manifest="md-tutorial.appcache"'
        }, {
          from: '###SOURCE'
          to: source.productionScriptTags buildPath
        }, {
          from: '###BASE'
          to: '<base href="' + buildPath + '" />'
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
        options:
          process: (src, file) ->
            src = src.replace '//# sourceMappingURL=', '// '
            src

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

    # Runs the e2e suite - web driver must already be running!
    protractor:
      mdTutorial:
        configFile: 'etc/protractor.conf.js'
        keepAlive: true
        noColor: false


  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-jasmine-node-coverage'
  grunt.loadNpmTasks 'grunt-protractor-runner'
  grunt.loadNpmTasks 'grunt-closure-compiler'
  grunt.loadNpmTasks 'grunt-text-replace'


  grunt.registerTask 'e2e', 'End to end tests', ['protractor']
  grunt.registerTask 'test-all', 'End to end tests', ['protractor']
  grunt.registerTask 'bootstrap', 'Generate index.html', ['replace', 'compass']

  grunt.registerTask 'build', 'Build The Project', ['bootstrap',
    'closure-compiler', 'copy', 'concat']

  grunt.registerTask 'lint', 'Lint the project', ['tslint', 'jshint',
                                                  'coffeelint']
