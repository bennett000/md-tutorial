/**
 * Created by michael on 29/03/15.
 */

///<reference path="./md-tutorial.ts" />
module mdTutorial {
    app.service('mdtMenuState', MdtMenuState).
        directive('mdtAppletSelector', mdtAppletSelector).
        directive('mdtAppletSelectors', mdtAppletSelectors);

    // filter selectors
    var defaultMode = '/sandbox';

    function mdtAppletSelector() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'html/applet-selector.html'
        };
    }

    function MdtMenuState() {
        var selected = defaultMode;
    }

    /** @ngInject */
    function mdtAppletSelectors($location, applets) {

        function getOnMenu(name:string) {
            /**
             * @param {string} applet
             */
            function onMenu(applet):boolean {
                return applets[applet].onMenu === name;
            }

            return onMenu;
        }


        function linkFn(scope:any) {
            scope.selectors = Object.keys(applets).
                filter(getOnMenu(scope.mdtMenu)).map(function (applet):any {
                    var a = applets[applet];
                    return {
                        icon: a.icon,
                        path: a.path,
                        label: a.label
                    }
                });
            scope.select = select;
            scope.selected = defaultMode;

            function select(path:string) {
                $location.path(path);
                scope.selected = path;
            }

        }

        return {
            restrict: 'E',
            replace: true,
            link: linkFn,
            scope: {
                mdtMenu: '@'
            },
            template: '<div class="mdt-applet-selectors"><mdt-applet-selector ' +
            'ng-repeat="selector in selectors"></mdt-applet-selector></div>'
        };
    }

}
