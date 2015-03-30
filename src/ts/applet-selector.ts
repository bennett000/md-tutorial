/**
 * Created by michael on 29/03/15.
 */

app.directive('mdtAppletSelector', function () {
    return {
        replace: true,
        templateUrl: 'html/applet-selector.html'
    };
}).directive('mdtAppletSelectors', function ($location, applets) {

    // filter selectors
    var selectors:any = Object.keys(applets).
        filter(onMenu).map(function (applet):any{
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

    function select(path:string) {
        $location.path(path);
    }

    function linkFn(scope:any) {
        scope.selectors = selectors;
        scope.select = select;
    }

    return {
        replace: true,
        link: linkFn,
        template: '<div class="mdt-applet-selectors"><mdt-applet-selector ' +
        'ng-repeat="selector in selectors"></mdt-applet-selector></div>'
    };
});