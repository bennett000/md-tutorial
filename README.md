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
*should* setup the user for work by calling `grunt bootstrap`.  JavaScript,
and TypeScript source files are listed in `project-root/etc/source.js`, this
file directly controls what gets built into the final JS.


#### Relevant Source Files/Folders

* project-root/spec - jasmine style TDD project specifications
* project-root/src/ts - TypeScript source code
* project-root/src/lib - Symbolicly linked dependencies (from node_modules/...)


#### Relevant Build Files/Folders

* project-root/src/js - destination folder for typescript compilation
* project-root/build - destination for builds of the tutorial
* project-root/source.js - central "manifest" of the project's source code,
used by internal build processes.


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

Lint:

    grunt lint

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


### Styles & Themes

If it is not readily evident, the author lacks skills with style, layout, and UI
in general (all hail the CLI).  However this is supposed to be an accessible
guide.  I would really *love it* if someone wanted to make this look good.

I would also really love it if we could offer a few built in styles, and the
ability to add/save custom styles in the client app.  I know how to make the
JS work, but My CSS/SCSS skills are just not going to fly.

I have attempted to *somewhat* respect
[this guide](http://thesassway.com/beginner/how-to-structure-a-sass-project)
but well, you'll see.


## License

Copyright (c) 2015 Michael J. Bennett

MIT License - see `project-root/LICENSE.md`

