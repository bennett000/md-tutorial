require('../scss/md-tutorial.scss');

import * as index from './index';
import {upgradeAdapter} from './upgrade-adapter';


angular.bootstrap(document.body, [index.APP_NAME], { strictDi: true });


upgradeAdapter.bootstrap(
  document.documentElement, [index.APP_NAME], { strictDi: true });
