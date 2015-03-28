Markdown Tutorial Dependencies
==============================

The end project will run as a simple self contained web application with no
external dependencies.  External dependencies will be managed with b̶o̶w̶e̶r̶ ̶w̶i̶t̶h̶ 
t̶h̶e̶ ̶o̶d̶d̶ ̶n̶p̶m̶ ̶e̶x̶c̶e̶p̶t̶i̶o̶n̶.̶ npm.

In the following "the author" refers to the author of md-tutorial, not the
third party technology.

## Angular

Angular is being included for convenience.  The author is familiar with
angular, and angular will abstract DOM code.  The author appreciates the fact
that Angular is *not necessarily* the best tool for this job, and will attempt
to use Angular as a *library*, not a framework.  Hopefully if anyone is so 
inclined they would easily be able to swap out view code.

Angular will be included through bower.


## evilstreak/markdown-js

The author intends to support multiple and/or alternate markdown interpereters
markdown-js seems like it will be the easiest markdown parser to get started
with.


## Grunt

Until the author learns about Gulp, or how to correctly maintain Makefiles the
build rules will be written in a Gruntfile.coffee.  The terse nature of coffee
script makes it ideal for writing an "interactive" configuration like a
Gruntfile.
