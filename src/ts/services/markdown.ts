/**
 * Created by michael on 28/03/15.
 */
// maintains a general interface to one, or more markdown programs
// we're going to start with one, and expand this @todo expand to multiple
// parsers
import {Injectable} from 'angular2/core';
import * as marked from 'marked';

let options:any = {
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    smartLists: true,
    smartypants: true
  };

marked.setOptions(options);

@Injectable()
export class Marked {
  // @todo optionally web workerize this
  render(md: string, options?: any): Promise<string> {
    return new Promise((resolve, reject) => {
      if (options) {
        marked(md, options, onReady)
      } else {
        marked(md, onReady);
      }

      function onReady(err, html) {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      }
    });
  }
}

