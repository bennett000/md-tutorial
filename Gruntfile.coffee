#
getConfig = require './scripts/load-config.js'

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

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-jasmine-node-coverage'
  grunt.loadNpmTasks 'grunt-karma'
  grunt.loadNpmTasks 'grunt-protractor-runner'
  grunt.loadNpmTasks 'grunt-closure-compiler'
  grunt.loadNpmTasks 'grunt-typescript'



  grunt.registerTask 'compile', 'Compile TS to JS', ['typescript']
  grunt.registerTask 'build', 'Build The Project', ['compile']
  #grunt.registerTask 'default', ['prepare']
