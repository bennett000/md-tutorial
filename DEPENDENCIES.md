Markdown Tutorial Dependencies
==============================

The end project will run as a simple self contained web application with no
external dependencies.  External dependencies will be managed with b̶o̶w̶e̶r̶ ̶
w̶i̶t̶h̶  t̶h̶e̶ ̶o̶d̶d̶ ̶n̶p̶m̶ ̶e̶x̶c̶e̶p̶t̶i̶o̶n̶.̶ npm, and bower will be
the odd exception.

In the following "the author" refers to the author of md-tutorial, not the
third party technology.

### Application

## Angular

Angular is being included for convenience.  The author is familiar with
angular, and angular will abstract DOM code.  The author appreciates the fact
that Angular is *not necessarily* the best tool for this job, and will attempt
to use Angular as a *library*, not a framework.  Hopefully if anyone is so 
inclined they would easily be able to swap out view code.

Angular will be included through npm, including angular mocks.


## marked

The author intends to support multiple and/or alternate markdown interpereters
marked seems like it will be the easiest markdown parser to get started
with.


### Build

## Grunt

Until the author learns about Gulp, or how to correctly maintain Makefiles the
build rules will be written in a Gruntfile.coffee.  The terse nature of coffee
script makes it ideal for writing an "interactive" configuration like a
Gruntfile.

Grunt, and numerous plugins are included through npm.

## TypeScript

The original intent of the author was to actually write in JavaScript, but the
prospect of sewing together, and processing (with Grunt or otherwise) a set
of JavaScript files seemed like more work than it was worth.  TypeScript should
be able to handle that alone.  Beyond that es6 sugar, and more static analysis
options are a plus.

## SCSS - Compass - MediaQueries

This likely means you need to have Ruby setup, and the relevant gems on your
system.  Npm will take care of a lot, but

Bower

## Icons

If you've noticed the hideous favicon.ico, or the equally hideous mobile icons,
then you'll understand why this project is using [Open Iconic](http://www.useiconic.com/open)