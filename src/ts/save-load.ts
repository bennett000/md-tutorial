///<reference path="./md-tutorial.ts" />
module mdTutorial {
    app.service('mdtConfirmation', MdtConfirmation).
        directive('mdtConfirm', mdtConfirm).
        directive('mdtLoadFile', mdtLoadFile).
        directive('mdtSaveAsInput', mdtSaveAsInput);

    /** @ngInject */
    function MdtConfirmation(mdtSafeCall) {
        var result = null,
            listeners = [];

        function reset() {
            result = null;
            listeners = [];
        }

        function on(callback) {
            if (typeof callback !== 'function') {
                return;
            }
            listeners.push(callback);
        }

        function resolve(val) {
            listeners.forEach(function (fn) {
                mdtSafeCall(fn, [val]);
            });
            reset();
        }

        this.reset = reset;
        this.on = on;
        this.resolve = resolve;
    }

    /** @ngInject */
    function mdtSaveAsInput(mdtMenuState) {

        function linkFn(scope) {
            function saveAs() {

            }
        }

        return {
            restrict: 'E',
            link: linkFn,
            template: '<form class="mdt-save-as-input"><input class="mdt-save-as-input-field" type="text" maxlength="255" ng-model="saveName"/><input class="mdt-save-as-input-button" type="button" value="Save As" mdt-tap="saveAs()"/></form>'
        };
    }

    /** @ngInject */
    function mdtLoadFile(mdtMenuState) {
        return {
        };
    }

    /** @ngInject */
    function mdtConfirm(mdtConfirmation) {
        return {
        };
    }
}
