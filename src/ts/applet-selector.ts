/**
 * Created by michael on 29/03/15.
 */

///<reference path="./md-tutorial.ts" />
module mdTutorial {
    app.service('mdtMenuState', MdtMenuState).
        service('mdtMenuFunctions', MdtMenuFunctions).
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

    function MdtMenuFunctions($location) {

        function go(args) {
            $location.path(args);
        }

        this.go = go;
    }

    /** @ngInject */
    function mdtAppletSelectors(mdtMenus, mdtMenuState, mdtMenuFunctions) {

        function getOnMenu(name:string) {
            /**
             * @param {string} applet
             */
            function onMenu(menu):boolean {
                return mdtMenus[menu].onMenu === name;
            }

            return onMenu;
        }


        function linkFn(scope:any) {
            var ignore;

            scope.selectors = Object.keys(mdtMenus).
                filter(getOnMenu(scope.mdtMenu)).map(function (menu):any {
                    var a = mdtMenus[menu];
                    return {
                        icon: a.icon,
                        fn: a.fn,
                        args: a.args,
                        label: a.label
                    }
                });
            scope.select = select;
            scope.selected = mdtMenuState.current();

            ignore = mdtMenuState.onUpdate(update);

            function update(val) {
                scope.selected = val;
            }

            function select(fn:string, args:string, label:string) {
                if (!mdtMenuFunctions[fn]) {
                    // @todo warn
                    return;
                }
                mdtMenuFunctions[fn](args);
                mdtMenuState.current(label);
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
