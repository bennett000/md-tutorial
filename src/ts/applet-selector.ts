/**
 * Created by michael on 29/03/15.
 */

app.directive('mdtAppletSelector', function () {
    return {
        replace: true,
        template: '<div class="mdt-applet-selector" ' +
        'mdt-tap="select(selector.path)">{{ selector.label }}</div>'
    };
}).directive('mdtAppletSelectors', function ($location, applets) {

    // filter selectors
    var selectors:any = Object.keys(applets).map(function (applet):any{
        var a = applets[applet];
        return {
            path: a.path,
            label: a.label
        }
    });

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