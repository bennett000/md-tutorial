md-tutorial todo
================

* Make scripts/test-server.js system agnostic
* Find someone with artistic skill to make icons
* Find someone with design skill for scss/sass
* Setup some watchers to automate compilation, bootstrapping, etc
* Pretty print syntax in rendered markdown's code blocks
* Grunt task to build a simple HTML5 manifest - then update replace task

## e2e Testing

* Fix e2e
* Elaborate e2e
* Start using PageObjects (nomenclature?)

## Flags panel

* icon img/icons/wrench.png

Should allow for toggling/editing of program flags - for advanced users, and
people who want to tinker.

## Local Storage Module

* window.localStorage can be leveraged to provide document support.  I have,
and angular wrapper lined up for this.
* localStorage will also be used to mark preferences
* Allow for HTML/MD to be exported through file system dialogues (email for ios)

## Layouts

* Mobile telephone layouts (portrait/landscape)
* Ideas for portrait layout
  * Tuck menu items into collapsable icon (img/icons/menu.svg)
  * Add top right toggle icon (img/icons/loop-circular.svg) - flips between
  textarea/rendered output???
* Themes.  There's still a lot to be sorted out for this

## Tutorial Mode

* Write a simple tutorial engine to iterate over the tutorial markdowns
* implement forward/back (icons in /img) in tutorial

## Beyond Marked, and Markdown

* Add support for other markdown dialects (currently vanilla/github are "easy")
* Add support for wiki dialects
* Add support for bbcodes
* Coffee Script? TypeScript? Seems like fun, but a whole other can of worms,
 with respect to highlighting, syntax errors, etc. I do obviously like the
 playground on coffeescript's webpage
