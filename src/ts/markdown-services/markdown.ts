/**
 * Created by michael on 28/03/15.
 */
// maintains a general interface to one, or more markdown programs
// we're going to start with one, and expand this @todo expand to multiple
// parsers

module markdown {
    var amodule:angular.IModule = angular.module('mdt-markdown', ['md-tutorial']),
        THROTTLE_MD:number = 150,
        Q:angular.IQService, // can use Q as drop in
        options:any = {
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            smartLists: true,
            smartypants: true
        };

    marked.setOptions(options);


    function render(md:string, options?:any):angular.IPromise<string> {
        var d:angular.IDeferred<string> = Q.defer();
        if (options) {
            marked(md, options, onReady)
        } else {
            marked(md, onReady);
        }

        function onReady(err, html) {
            if (err) {
                d.reject(err);
            } else {
                d.resolve(html);
            }
        }

        return d.promise;
    }

    class MarkdownCtrl {
        constructor($scope, $q, $sce, throttle) {
            Q = $q;
            $scope.md = {
                input: '',
                output: ''
            };
            $scope.md.update = throttle(update, THROTTLE_MD);

            function update() {
                render($scope.md.input).then(function (html){
                    /* @todo sanitize this way better */
                    $scope.md.output = $sce.trustAsHtml(html);
                });
            }
        }
        update():void {  }
    }


    amodule.service('mdtMarked', function markedFactory($q) {
        Q = $q;
        // @todo optionally web workerize this
        this.render = render;
    }).controller('Markdown', MarkdownCtrl);
}

