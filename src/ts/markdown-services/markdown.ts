/**
 * Created by michael on 28/03/15.
 */
// maintains a general interface to one, or more markdown programs
// we're going to start with one, and expand this @todo expand to multiple
// parsers

module markdown {
    var amodule:angular.IModule = angular.module('mdt-markdown', []),
        Q:angular.IQService, // can use Q as drop in
        options:any = {
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            smartLists: true,
            smartypants: true
        };

    amodule.service('mdtMarked', markedFactory);

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

    /** @ngInject */
    function markedFactory($q) {
        Q = $q;
        // @todo optionally web workerize this
        this.render = render;
    }

}

