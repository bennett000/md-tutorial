function marked(a, b, c) {
    'use strict';

    if (typeof b === 'function') {
        b();
    } else {
        c();
    }
}

marked.setOptions = function () {
    'use strict';

};