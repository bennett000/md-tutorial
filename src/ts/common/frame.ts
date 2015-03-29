/**
 * file: frame.ts
 * Created by michael on 28/03/15.
 */

app.directive('mdtFrame', function frameDirective() {

    return {
        replace: true,
        templateUrl: '/html/frame.html'
    };
});
