/**
 * Created by michael on 28/03/15.
 */
// maintains a general interface to one, or more markdown programs
// we're going to start with one, and expand this @todo expand to multiple
// parsers
import * as marked from 'marked';

let Q:angular.IQService, // can use Q as drop in
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
  const d:angular.IDeferred<string> = Q.defer();
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

export function markedFactory($q) {
  Q = $q;
  // @todo optionally web workerize this
  this.render = render;
}
markedFactory.$inject = ['$q'];

