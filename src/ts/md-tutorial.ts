/**
 * file: md-tutorial.ts
 * Created by michael on 28/03/15.
 */

///<reference path="../../etc/defs/index.d.ts" />
var app = angular.module('md-tutorial', ['ngRoute', 'mdt-markdown']).
    config(function ($routeProvider, applets) {
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
    }).value('appFlags', {
        worker: {
            error: null,
            is: false
        },
        storage: {
            error: null,
            is: false
        }
    }).constant('applets', {
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
    }).directive('mdtFrame', function frameDirective() {
        return {
            replace: true,
            templateUrl: '/html/frame.html'
        };
    }).directive('mdtMarkdownSandbox', function mdSandbox() {
        return {
            replace: true,
            scope: {},
            controller: 'Markdown',
            templateUrl: '/html/sandbox-directive.html'
        }
    });

