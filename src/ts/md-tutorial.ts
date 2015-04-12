/**
 * file: md-tutorial.ts
 * Created by michael on 28/03/15.
 */

///<reference path="../../etc/defs/index.d.ts" />
module mdTutorial {
    var appFlags = {
            worker: {
                error: null,
                is: false
            },
            storage: {
                error: null,
                is: false
            }
        },
        applets = {
            about: {
                label: 'About',
                path: '/about',
                icon: '/img/icons/question-mark.svg',
                controller: 'Sandbox',
                controllerAs: 'sandbox',
                template: 'html/sandbox.html',
                onMenu: false
            },
            sandbox: {
                label: 'Sandbox',
                path: '/sandbox',
                icon: 'img/icons/pencil.svg',
                controller: 'Sandbox',
                controllerAs: 'sandbox',
                template: 'html/sandbox.html',
                onMenu: true
            },
            tutorial: {
                label: 'Tutorial',
                path: '/tutorial',
                icon: 'img/icons/location.svg',
                controller: 'Tutorial',
                controllerAs: 'tutorial',
                template: 'html/tutorial.html',
                onMenu: true
            },
            reference: {
                label: 'Reference',
                path: '/reference',
                icon: 'img/icons/book.svg',
                controller: 'Reference',
                controllerAs: 'reference',
                template: 'html/reference.html',
                onMenu: true
            }
        };
    export var app = angular.module('md-tutorial', ['ngRoute', 'mdt-markdown']).
        config(configureRoutes).
        value('appFlags', appFlags).
        constant('applets', applets).
        service('mdtSandboxState', MdtSandboxState).
        directive('mdtFrame', frameDirective).
        directive('mdtSandbox', mdtSandbox);

    /**
     * @ngInject
     */
    function configureRoutes($routeProvider, applets) {
        //$routeProvider.when('/', {
        //    templateUrl: 'html/root.html',
        //    controller: 'FirstTime',
        //    controllerAs: 'firstTime'
        //});

        Object.keys(applets).forEach(function (applet) {
            var a = applets[applet];
            $routeProvider.when(a.path, {
                templateUrl: a.template,
                controller: a.controller,
                controllerAs: a.controllerAs
            });
        });
        $routeProvider.otherwise({
            redirectTo: '/sandbox'
        });
    }

    function frameDirective() {
        return {
            replace: true,
            templateUrl: 'html/frame.html'
        };
    }

    /** @ngInject */
    function MdtSandboxState(localStorage) {
        var prefix = 'sandbox-',
            newFileLabel = '__new __file',
            currentFile:string = newFileLabel,
            updateListeners = {},
            storage = {};

        function file(name:string, value?:string):string {
            if (!name) {
                return '';
            }
            if (value === undefined) {
                if (storage[name]) {
                    return storage[name];
                }
                storage[name] = localStorage.get(prefix + name);
                return storage[name];
            }
            if (storage[name] === value) {
                return storage[name];
            }
            storage[name] = value;
            localStorage.set(prefix + name, value);
            return storage[name];
        }

        function safeCall(fn) {
            try {
                return fn();
            } catch (err) {
                // fail silent
            }
        }

        function update() {
            Object.keys(updateListeners).forEach(function (id) {
                safeCall(updateListeners[id]);
            });
        }

        function current(name?:string):string {
            if (name === undefined) {
                return currentFile;
            }
            currentFile = name;
            update();
            return currentFile;
        }

        function remove(name:string):void {
            localStorage.remove(prefix + name);
        }

        function onUpdate(callback:Function):Function {
            if (typeof callback !== 'function') {
                return angular.noop;
            }
            var id = Date.now().toString(16) + '.' + Math.random();
            updateListeners[id] = callback;
            function remove() {
                delete updateListeners[id];
            }

            return remove;
        }

        /**
         * @param {string} oldName
         * @param {string} newName
         * @param {boolean} overwrite
         * @return {string} '' for success otherwise an error string
         */
        function saveAs(oldName, newName, overwrite?:boolean):string {
            if (!file(oldName)) {
                return 'file ' + oldName + ' not found';
            }
            if (!overwrite) {
                if (file(newName)) {
                    return 'file ' + newName + ' exists';
                }
            }
            file(newName, file(oldName));
            // if the file being saved was the "new file" reset it
            if (oldName === newFileLabel) {
                file(newFileLabel, '');
            }
            return '';
        }

        this.file = file;
        this.remove = remove;
        this.current = current;
        this.onUpdate = onUpdate;
        this.saveAs = saveAs;
    }

    /** @ngInject */ // @todo also rename this, and make it its own
    function mdtSandbox($sce, mdtMarked, throttle, mdtSandboxState) {
        var THROTTLE_MD:number = 150;

        function linkFn(scope:any, e:any, a:any, c:any, trans:any) {
            scope.md = {
                input: '',
                output: '',
                update: throttle(update, THROTTLE_MD)
            };
            trans(scope, onTransclude);

            // "current' (managed) mode takes precedence
            if (scope.mdtCurrent) {
                // "current" (managed) mode
                scope.md.input = mdtSandboxState.file(mdtSandboxState.current());
                update();
            } else if (scope.mdtFile) {
                // declarative "file" mode
                scope.md.input = mdtSandboxState.file(scope.mdtFile) || '';
                update();
            }

            function update() {
                return mdtMarked.render(scope.md.input).then(function (html) {
                    /* @todo sanitize - is this relevant client side only? */
                    scope.md.output = $sce.trustAsHtml(html);

                    // "current' (managed) mode takes precedence
                    if (a.mdtCurrent) {
                        mdtSandboxState.file(mdtSandboxState.current(),
                            scope.md.input);
                    } else if (a.mdtFile) {
                        mdtSandboxState.file(scope.mdtFile, scope.md.input);
                    }
                });
            }

            // transclusion only works when current, and file modes are off
            function onTransclude(content) {
                if (scope.mdtFile || scope.mdtCurrent) {
                    // stop transcluding
                    return;
                }
                // mark down the declarative text
                var result = angular.element(content).text();
                if (!result) {
                    return;
                }
                scope.md.input = result;
                update();
            }
        }

        return {
            replace: true,
            scope: {
                mdtFile: '@',
                mdtCurrent: '@'
            },
            transclude: true,
            link: linkFn,
            templateUrl: 'html/sandbox-directive.html'
        }
    }
}
