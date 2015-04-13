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
        var states = {
                selected: defaultMode,
                toggle: ''
            },
            that = mdtMakeListener(this);

        function access(prop, val?:string):string {
            if (val === undefined) {
                return states[prop];
            }
            states[prop] = val;
            that.emitSync(prop, val);
            return states[prop];
        }

        function current(val?:string) {
            return access('selected', val);
        }

        function onSelect(cb) {
            return that.on('selected', cb);
        }

        function onToggle(cb) {
            return that.on('toggle', cb);
        }

        function toggle(val?:string) {
            return access('toggle', val);
        }

        this.toggle = toggle;
        this.selected = current;
        this.onSelect = onSelect;
        this.onToggle = onToggle;
    }

    function MdtMenuFunctions($location, mdtMenuState) {

        function go(args, label) {
            $location.path(args);
            mdtMenuState.current(label);
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
            var listenSelect, listenToggle;

            scope.toggle = '';
            scope.selectors = Object.keys(mdtMenus).
                filter(getOnMenu(scope.mdtMenu)).map(function (menu):any {
                    var a = mdtMenus[menu];
                    return {
                        icon: a.icon,
                        fn: a.fn,
                        args: a.args,
                        label: a.label,
                        toggle: a.toggle
                    }
                });
            scope.select = select;
            scope.selected = mdtMenuState.selected();
            scope.toggle = mdtMenuState.toggle();

            listenSelect = mdtMenuState.onSelect(updateSelect);
            listenToggle = mdtMenuState.onToggle(updateToggle);

            function updateSelect(val) {
                scope.selected = val;
            }

            function updateToggle(val) {
                scope.toggle = val;
            }

            function select(fn:string, args:string, label:string) {
                if (!mdtMenuFunctions[fn]) {
                    // @todo warn
                    return;
                }
                mdtMenuFunctions[fn](args, label);
            }

            function destroy() {
                listenSelect();
                listenToggle();
            }

            scope.$on('$destroy', destroy);
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
