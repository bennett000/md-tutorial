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
        factory('mdtSandboxState', mdtSandboxState).
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
    function mdtSandboxState(localStorage) {
        var prefix = 'sandbox-',
            storage = {};

        function value(name:string, value:any):string {
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

        return value;
    }

    /** @ngInject */ // @todo also rename this, and make it its own
    function mdtSandbox($q, $sce, mdtMarked, throttle, mdtSandboxState) {
        var THROTTLE_MD:number = 150;
        function linkFn(scope:any, e:any, a:any, c:any, trans:any) {
            scope.md = {
                input: '',
                output: '',
                update: throttle(update, THROTTLE_MD)
            };
            trans(scope, onTransclude);

            if (scope.mdtName) {
                scope.md.input = mdtSandboxState(scope.mdtName) || '';
            }

            function update() {
                return mdtMarked.render(scope.md.input).then(function (html) {
                    /* @todo sanitize - is this relevant client side only? */
                    scope.md.output = $sce.trustAsHtml(html);
                    if (a.mdtName) {
                        mdtSandboxState(scope.mdtName, scope.md.input);
                    }
                });
            }

            function onTransclude(content) {
                if (scope.mdtName) {
                    // name takes precedence over transclusion
                    return;
                }
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
                mdtName: '@'
            },
            transclude: true,
            link: linkFn,
            templateUrl: 'html/sandbox-directive.html'
        }
    }
}
