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
    };

    export var app = angular.module('md-tutorial', ['ngRoute']).
        config(configureRoutes).
        value('appFlags', appFlags).
        directive('mdtFrame', frameDirective).
        controller('FirstTime', function () {
            console.debug('first time');
        }).controller('Sandbox', function () {
            console.debug('sandbox');
        }).controller('Reference', function () {
            console.debug('reference');
        }).controller('Tutorial', function () {
            console.debug('tutorial');
        }).controller('About', function () {
            console.debug('about');
        });

    /**
     * @ngInject
     */
    function configureRoutes($routeProvider, mdtApplets) {
        //$routeProvider.when('/', {
        //    templateUrl: 'html/root.html',
        //    controller: 'FirstTime',
        //    controllerAs: 'firstTime'
        //});

        Object.keys(mdtApplets).forEach(function (applet) {
            var a = mdtApplets[applet];
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
}
