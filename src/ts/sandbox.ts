///<reference path="./main.ts" />
module mdTutorial {
    app.service('mdtSandboxState', MdtSandboxState).
        directive('mdtSandbox', mdtSandbox);

    /** @ngInject */
    function MdtSandboxState(localStorage, mdtMakeListener) {
        var that = mdtMakeListener(this),
            prefix = 'sandbox-',
            newFileLabel = '__new __file',
            currentFile:string = newFileLabel,
            storage = {};

        function list():string[] {
            return localStorage.list(prefix).map(function (fileName) {
                return fileName.slice(prefix.length);
            }).filter(function (fileName) {
                return fileName != newFileLabel;
            }).sort(naturalSort);
        }

        function file(name:string, value?:string):string {
            if (!name) {
                return '';
            }
            if (value === undefined) {
                if (storage[name]) {
                    return storage[name];
                }
                storage[name] = localStorage.get(prefix + name);
                return storage[name];
            }
            if (storage[name] === value) {
                return storage[name];
            }
            storage[name] = value;
            localStorage.set(prefix + name, value);
            that.emitSync('update');
            return storage[name];
        }

        function update() {
            that.emitSync('update');
        }

        function current(name?:string):string {
            if (name === undefined) {
                return currentFile;
            }
            currentFile = name;
            update();
            return currentFile;
        }

        function remove(name:string):void {
            if (storage[name]) {
                delete storage[name];
            }
            localStorage.remove(prefix + name);
        }

        function onUpdate(callback:Function):Function {
            return that.on('update', callback);
        }

        /**
         * @param {string} oldName
         * @param {string} newName
         * @param {boolean} overwrite
         * @return {string} '' for success otherwise an error string
         */
        function saveAs(oldName, newName, overwrite?:boolean):string {
            if (!file(oldName)) {
                return 'file ' + oldName + ' not found';
            }
            if (!overwrite) {
                if (file(newName)) {
                    return 'file ' + newName + ' exists';
                }
            }
            file(newName, file(oldName));
            // if the file being saved was the "new file" reset it
            if (oldName === newFileLabel) {
                file(newFileLabel, '');
            }
            return '';
        }

        this.list = list;
        this.file = file;
        this.remove = remove;
        this.current = current;
        this.onUpdate = onUpdate;
        this.saveAs = saveAs;
    }

    /** @ngInject */
    function mdtSandbox($sce, mdtMarked, throttle, mdtSandboxState) {
        var THROTTLE_MD:number = 150;

        function linkFn(scope:any, e:any, a:any, c:any, trans:any) {
            var updateListener;

            scope.md = {
                input: '',
                output: '',
                update: throttle(update, THROTTLE_MD)
            };
            trans(scope, onTransclude);

            // "current' (managed) mode takes precedence
            if (scope.mdtCurrent) {
                // "current" (managed) mode
                loadCurrent();
                updateListener = mdtSandboxState.on('update', loadCurrent);
            } else if (scope.mdtFile) {
                // declarative "file" mode
                scope.md.input = mdtSandboxState.file(scope.mdtFile) || '';
                update();
            }

            e.on('$destroy', destroy);

            function loadCurrent() {
                scope.md.input = mdtSandboxState.file(mdtSandboxState.current());
                update();
            }

            function update() {
                return mdtMarked.render(scope.md.input).then(function (html) {
                    /* @todo sanitize - is this relevant client side only? */
                    scope.md.output = $sce.trustAsHtml(html);

                    // "current' (managed) mode takes precedence
                    if (a.mdtCurrent) {
                        mdtSandboxState.file(mdtSandboxState.current(),
                            scope.md.input);
                    } else if (a.mdtFile) {
                        mdtSandboxState.file(scope.mdtFile, scope.md.input);
                    }
                });
            }

            // transclusion only works when current, and file modes are off
            function onTransclude(content) {
                if (scope.mdtFile || scope.mdtCurrent) {
                    // stop transcluding
                    return;
                }
                // mark down the declarative text
                var result = angular.element(content).text();
                if (!result) {
                    return;
                }
                scope.md.input = result;
                update();
            }

            function destroy() {
                if (updateListener) {
                    updateListener();
                }
            }
        }

        return {
            replace: true,
            scope: {
                mdtFile: '@',
                mdtCurrent: '@'
            },
            transclude: true,
            link: linkFn,
            templateUrl: 'html/sandbox-directive.html'
        }
    }
}
