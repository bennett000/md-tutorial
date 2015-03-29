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
        sandbox: {
            label: 'Sandbox',
            path: '/sandbox',
            controller: 'Sandbox',
            controllerAs: 'sandbox',
            template: '/html/sandbox.html'
        },
        walkthrough: {
            label: 'Walkthrough',
            path: '/walkthrough',
            controller: 'Walkthrough',
            controllerAs: 'walkthrough',
            template: '/html/walkthrough.html'
        },
        reference: {
            label: 'Reference',
            path: '/reference',
            controller: 'Reference',
            controllerAs: 'reference',
            template: '/html/reference.html'
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

