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

        function onPrompt(cb) {
            return that.on('prompt', cb);
        }

        function prompt(val?:string) {
            return access('prompt', val);
        }

        this.prompt = prompt;
        this.toggle = toggle;
        this.selected = current;
        this.onSelect = onSelect;
        this.onToggle = onToggle;
        this.onPrompt = onPrompt;
    }

    /** @ngInject */
    function MdtMenuFunctions($window, $location, mdtMenuState,
                              mdtSandboxState, mdtMarked) {

        function go(args, label) {
            $location.path(args);
            mdtMenuState.selected(label);
        }

        function promptSaveAs(args, label) {

        }

        function promptLoad(args, label) {

        }

        function validateSaveCall(cur) {
            var data = mdtSandboxState.file(cur);
            if (!data) {
                return null;
            }
            return data;
        }

        function getLabel(cur, data) {
            if (cur === '__new __file') {
                return data.slice(0, data.indexOf('\n'));
            } else {
                return cur;
            }
        }

        function email() {
            var cur = mdtSandboxState.current(),
                data = validateSaveCall(cur),
                subject = '';
            if (!data) {
                return;
            }
            subject = getLabel(cur, data);
            $window.location.href = ['mailto:?subject=',
                encodeURIComponent(subject),
                '&body=', encodeURIComponent(data)].join('');
        }

        function download() {
            var cur = mdtSandboxState.current(),
                data = validateSaveCall(cur),
                filename = '';
            filename = getLabel(cur, data);
            mdtMarked.render(data).then(function (html) {
                var uriContent = "data:application/octet-stream," +
                    encodeURIComponent(html);
                /*global window*/
                window.open(uriContent, filename + '.html');
            }, function (err) {
                /** @todo error system */
                console.warn(err.message);
            });
        }

        this.go = go;
        this.email = email;
        this.download = download;
        this.promptLoad = promptLoad;
        this.promptSaveAs = promptSaveAs;
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
