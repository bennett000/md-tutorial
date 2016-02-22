// Karma configuration
// Generated on Tue Feb 04 2014 21:57:25 GMT-0500 (EST)
/*global module, require */
const path = require('path');
module.exports = function(config) {
  'use strict';

  config.set(
    {
      // enable / disable watching file and executing tests whenever any
      // file changes
      autoWatch: false,

      // base path, that will be used to resolve files and exclude
      basePath: '..',

      // Start these browsers, currently available:
      // - Chrome
      // - ChromeCanary
      // - Firefox
      // - Opera (has to be installed with `npm install karma-opera-launcher`)
      // - Safari (only Mac; has to be installed with `npm install
      // karma-safari-launcher`)
      // - PhantomJS
      // - IE (only Windows; has to be installed with `npm install
      // karma-ie-launcher`)
      browsers: ['Firefox'], //, 'PhantomJS', 'Chrome'],

      // If browser does not capture in given timeout [ms], kill it
      captureTimeout: 60000,

      // enable / disable colors in the output (reporters and logs)
      colors: true,

      // coverage setup
      coverageReporter: {
        dir: 'coverage/',
        reporters: [
          { type: 'html', subdir: 'report-html' },
          { type: 'lcov', subdir: 'report-lcov' },
          { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
          { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
          { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
          { type: 'text', subdir: '.', file: 'text.txt' },
          { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
        ]
      },

      // list of files to exclude
      exclude: [],

      files: [
        'node_modules/angular/angular.js',
        'node_modules/angular-route/angular-route.js',
        'node_modules/angular-aria/angular-aria.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'spec/unit/mock-*.js',
        'src/ts/index.ts',
        'spec/unit/helper-*.js',
        'spec/unit/*-spec.js',
        'src/html/**/*.html'
      ],

      // frameworks to use
      frameworks: ['jasmine'],

      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
      // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_WARN,

      ngHtml2JsPreprocessor: {
        stripPrefix: 'src/'
      },

      plugins: [
        require('karma-coverage'),
        require('karma-firefox-launcher'),
        require('karma-jasmine'),
        require('karma-ng-html2js-preprocessor'),
        require('karma-sourcemap-loader'),
        require('karma-webpack')
      ],

      // web server port
      port: 9876,

      // coverage support
      preprocessors: {
        'src/**/*.ts': ['webpack', 'sourcemap', 'coverage'],
        'src/html/**/*.html': ['ng-html2js']
      },

      // test results reporter to use
      // possible values: 'dots', 'progress', 'coverage'
      reporters: ['progress', 'coverage'],

      // Continuous Integration mode
      // if true, it capture browsers, run tests and exit
      singleRun: false,

      webpack: {
        devtool: 'source-map',
        resolve: {
          extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
        },
        module: {
          loaders: [
            { test: /\.ts$/, loader: 'ts-loader', exclude: [
              /node_modules/, /build/, /lib/ ]},
            {
              test: /\.scss$/,
              // Query parameters are passed to node-sass
              loader: 'style-loader!raw-loader!sass-loader?includePaths[]=' +
              path.resolve(__dirname, '../node_modules/compass-mixins/lib')
            },
            { test: /\.html$/, loader: 'raw' },
            { test: /\.png/, loader: 'url' },
            { test: /\.svg/, loader: 'file-loader' },
            { test: /\.eot/, loader: 'url' },
            { test: /\.woff/, loader: 'url' },
            { test: /\.woff2/, loader: 'url' },
            { test: /\.ttf/, loader: 'url' }
          ]
        },
        stats: { colors: true, reasons: true },
        debug: false
      },

      webpackServer: {
        noInfo: true // prevent console spamming when running in Karma!
      }

    });
};
