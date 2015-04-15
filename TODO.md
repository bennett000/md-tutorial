md-tutorial todo
================

* Make scripts/test-server.js system agnostic
* Find someone with design skill for scss/sass
* Setup some watchers to automate compilation, bootstrapping, etc
* Pretty print syntax in rendered markdown's code blocks
* Grunt task to build a simple HTML5 manifest - then update replace task
* Ability to easily modify layout during "work"
* Make app as accessible as possible.  Currently the app is barely accessible
[Basic Accessibility Tips](http://webaccess.berkeley.edu/resources/tips/web-accessibility)
[angular also has some accessibility support](https://docs.angularjs.org/guide/accessibility)
* Tabbing seems broken in Firefox
* Reference Page is *horrible* there must be many ways to make it cleaner, and
sane.  Also it has some issues with a few mardkown features not working...

## Flags panel

* icon img/icons/wrench.png

Should allow for toggling/editing of program flags - for advanced users, and
people who want to tinker.

## Local Storage Module

* Show files "dialog"
* Show prompt (overwrite warning)
* Show save as "dialog"

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
