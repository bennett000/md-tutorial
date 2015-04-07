/**
 * Created by michael on 29/03/15.
 */

module mdTutorial {
    app.directive('mdtAppletSelector', mdtAppletSelector).
        directive('mdtAppletSelectors', mdtAppletSelectors);

    function mdtAppletSelector() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'html/applet-selector.html'
        };
    }

    /** @ngInject */
    function mdtAppletSelectors($location, applets) {

        // filter selectors
        var defaultMode = '/sandbox',
            selectors:any = Object.keys(applets).
                filter(onMenu).map(function (applet):any {
                    var a = applets[applet];
                    return {
                        icon: a.icon,
                        path: a.path,
                        label: a.label
                    }
                });

        /**
         * @param {string} applet
         */
        function onMenu(applet):boolean {
            return applets[applet].onMenu;
        }


        function linkFn(scope:any) {
            scope.selectors = selectors;
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
            scope: {},
            template: '<div class="mdt-applet-selectors"><mdt-applet-selector ' +
            'ng-repeat="selector in selectors"></mdt-applet-selector></div>'
        };
    }

}
