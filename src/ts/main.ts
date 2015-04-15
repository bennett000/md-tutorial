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

    export var app = angular.module('md-tutorial', ['ngRoute', 'ngAria']).
        config(configureRoutes).
        value('appFlags', appFlags).
        directive('mdtFrame', frameDirective).
        controller('FirstTime', NonSavingController).
        controller('Reference', NonSavingController).
        controller('Tutorial', NonSavingController).
        controller('About', NonSavingController).
        controller('Sandbox', Sandbox);

    /** @ngInject */
    function Sandbox($scope, mdtMenuState, mdtSandboxState) {
        function setToggles() {
            var toggleString = '', cur = mdtSandboxState.current();
            if (!mdtSandboxState.list().length) {
                toggleString += 'hide-load';
            }
            if (!mdtSandboxState.file(cur)) {
                toggleString += 'hide-save-as hide-email hide-download';
            }
            // if it's a new file, and it's empty remove is invisible
            if (!mdtSandboxState.file(cur) && (cur === '__new __file')) {
                toggleString += 'hide-save-as hide-email hide-download ' +
                'hide-remove';
            }
            mdtMenuState.toggle(toggleString);
        }
        setToggles();
        this.setToggles = setToggles;
        $scope.$on('$destroy', mdtSandboxState.onUpdate(setToggles));
    }

    /** @ngInject */
    function NonSavingController(mdtMenuState, mdtMenus) {
        var toggleString = '';
        Object.keys(mdtMenus).forEach(function (name) {
            if (!mdtMenus[name].toggle) {
                return;
            }
            toggleString += mdtMenus[name].toggle + ' ';
        });
        mdtMenuState.toggle(toggleString);
    }

    /** @ngInject */
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

    /** @ngInject */
    function frameDirective(mdtMenuState) {

        function linkFn(scope:any) {
            var listenToggle = mdtMenuState.onToggle(update);

            update(mdtMenuState.toggle());

            function update(val) {
                scope.toggle = val;
            }

            scope.$on('$destroy', listenToggle);
        }

        return {
            replace: true,
            scope: {},
            link: linkFn,
            templateUrl: 'html/frame.html'
        };
    }
}
