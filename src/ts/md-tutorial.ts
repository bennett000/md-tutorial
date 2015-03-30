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
                template: '/html/sandbox.html',
                onMenu: false
            },
            sandbox: {
                label: 'Sandbox',
                path: '/sandbox',
                icon: 'img/icons/pencil.svg',
                controller: 'Sandbox',
                controllerAs: 'sandbox',
                template: '/html/sandbox.html',
                onMenu: true
            },
            tutorial: {
                label: 'Tutorial',
                path: '/tutorial',
                icon: 'img/icons/location.svg',
                controller: 'Tutorial',
                controllerAs: 'tutorial',
                template: '/html/tutorial.html',
                onMenu: true
            },
            reference: {
                label: 'Reference',
                path: '/reference',
                icon: 'img/icons/book.svg',
                controller: 'Reference',
                controllerAs: 'reference',
                template: '/html/reference.html',
                onMenu: true
            }
        };
    export var app = angular.module('md-tutorial', ['ngRoute', 'mdt-markdown']).
        config(configureRoutes).
        value('appFlags', appFlags).
        constant('applets', applets).
        directive('mdtFrame', frameDirective).
        directive('mdtMarkdownSandbox', mdSandbox);

    /**
     * @ngInject
     */
    function configureRoutes($routeProvider, applets) {
        $routeProvider.when('/', {
            templateUrl: '/html/root.html',
            controller: 'FirstTime',
            controllerAs: 'firstTime'
        });

        Object.keys(applets).forEach(function (applet) {
            var a = applets[applet];
            $routeProvider.when(a.path, {
                templateUrl: a.template,
                controller: a.controller,
                controllerAs: a.controllerAs
            });
        });
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }

    function frameDirective() {
        return {
            replace: true,
            templateUrl: '/html/frame.html'
        };
    }

    /** @ngInject */ // @todo also rename this, and make it its own
    function mdSandbox($q, $sce, mdtMarked, throttle) {
        var THROTTLE_MD:number = 150;

        function linkFn(scope:any, elem:any, attrs:any, controller:any, trans:any) {
            scope.md = {
                input: '',
                output: ''
            };
            scope.md.update = throttle(update, THROTTLE_MD);
            trans(scope, onTransclude);

            function update() {
                mdtMarked.render(scope.md.input).then(function (html) {
                    /* @todo sanitize this way better */
                    scope.md.output = $sce.trustAsHtml(html);
                });
            }

            function onTransclude(content) {
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
            scope: {},
            transclude: true,
            link: linkFn,
            templateUrl: '/html/sandbox-directive.html'
        }
    }
}
