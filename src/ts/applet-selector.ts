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

    /** @ngInject */
    function MdtMenuState(mdtMakeListener) {
        var selected = defaultMode,
            that = mdtMakeListener(this);

        function current(val?:string):string {
            if (val === undefined) {
                return selected;
            }
            selected = val;
            that.emitSync('update', val);
            return selected;
        }

        function onUpdate(cb) {
            return that.on('update', cb);
        }

        this.current = current;
        this.onUpdate = onUpdate;
    }

    /** @ngInject */
    function mdtAppletSelectors($location, applets, mdtMenuState) {

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
            var ignore;

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
            scope.selected = mdtMenuState.current();

            ignore = mdtMenuState.onUpdate(update);

            function update(val) {
                scope.selected = val;
            }

            function select(path:string) {
                $location.path(path);
                mdtMenuState.current(path);
            }

            scope.$on('$destroy', ignore);
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
