Markdown Tutorial
=================

This README is all about the markdown tutorial code base.  The actual tutorial
can be found here: (@todo make a github page)

## Build Environment

The project aims to have as system neutral a build process as possible,
nevertheless there are a few external dependencies, and other local settings
that need to be accounted for.  This file `md-tutorial/project-config.template`
can be copied to `md-tutorial/project-config` and tuned accordingly.  This file
should be ignored by git.

For more information about dependencies see `md-tutorial/DEPENDENCIES.md`

### Build Environment Overview

So far everything is managed with npm, and grunt. In theory the `npm install`
*should* setup the user for work by callling `grunt bootstrap`

#### Relevant Source Files/Folders

* project-root/spec - jasmine style TDD project specifications
* project-root/src/ts - TypeScript source code
* project-root/src/lib - Symbolicly linked dependencies (from node_modules/...)

#### Relevant Build Files/Folders

* project-root/src/js - destination folder for typescript compilation
* project-root/source.js - central "manifest" of the project's source code,
used by internal build processes.
* project-root/build - destination for builds of the tutorial

### npm

On initial download, and on subsequent pulls

    npm install

or

    npm update

To run a local server

    npm start

To run unit tests

    npm test

### Grunt

Unit tests (same as npm test):

    grunt test

End to end tests:

    grunt e2e

All tests:

    grunt test-all

Compile - Generate intermediate JS from TS:

    grunt compile

grunt bootstrap - build index.html files, and compile:

    grunt bootstrap

Build (Build for production):

    grunt build

More grunt tasks:

    grunt --help

### Testing

Unit tests have been written in the TDD jasmine style, and a Karma configuration
is provided for running the suite.  End to end tests are also written in the
jasmine style but require protractor/web driver to run.

With any luck the unit tests should run out of the box if you have firefox, and
a valid npm install.  The primary karma suite's configuration can be found at
`project-root/etc/karma.conf.js`

The end to end tests require more effort to setup.  Before running the grunt
e2e/protractor task(s) a web driver instance *must be running*.  Setting up
protractor is beyond the scope of this document, more information can be found
[here](https://docs.angularjs.org/guide/e2e-testing)


## Plans

Concept(http://blog.codinghorror.com/toward-a-better-markdown-tutorial/)

* Sandbox
* Reference Card
* Walkthrough

### Sandbox

Simple two column device portable screen, left side markdown, right side is
rendered content.  If possible lets toggle between dialects.

### Reference Card

Draw inspiration from Randal M. - good luck with that!

### Walkthrough

Step through a series of sandboxes, that show a feature

### Needs

* Data structure of markdown features for Walkthrough
* Markdown browser js librar(y/ies)
* Human friendly layout for application
* Human friendly layouts for applets (sandbox/walkthrough/reference)
* Better build plan


## License

Copyright (c) 2015 Michael J. Bennett

MIT License - see `project-root/LICENSE.md`

