import {upgradeAdapter} from './upgrade-adapter';
export const APP_NAME = 'md-tutorial';

import {frameDirective, appFlags, configureRoutes, Sandbox,
  NonSavingController} from './main';

export const app = angular.module(APP_NAME, ['ngRoute', 'ngAria'])
  .config(configureRoutes)
  .value('appFlags', appFlags)
  .directive('mdtFrame', frameDirective)
  .controller('FirstTime', NonSavingController)
  .controller('Reference', NonSavingController)
  .controller('Tutorial', NonSavingController)
  .controller('About', NonSavingController)
  .controller('Sandbox', Sandbox);

import {applets} from './descriptions-applet';
app.constant('mdtApplets', applets);

import {menus} from './descriptions-menus';
app.constant('mdtMenus', menus);

import {tutorial} from './descriptions-tutorial';
app.constant('mdtTutorial', tutorial);

import {Marked} from './services/markdown';
app.factory('mdtMarked', upgradeAdapter.downgradeNg2Provider(Marked));

import {MdtMenuState} from './services/menu-services';
app.factory('mdtMenuState', upgradeAdapter.downgradeNg2Provider(MdtMenuState))

import {mdtAppletSelector, mdtAppletSelectors, MdtMenuFunctions} from './menus';
app.directive('mdtAppletSelector', mdtAppletSelector)
  .directive('mdtAppletSelectors', mdtAppletSelectors)
  .service('mdtMenuFunctions', MdtMenuFunctions);

import {LocalStorage} from './services/browser';
app.factory('localStorage', upgradeAdapter.downgradeNg2Provider(LocalStorage));

import {safeCall, naturalSort, makeListenerFactory} from './services/common';
app.value('mdtSafeCall', safeCall)
  .value('mdtNaturalSort', naturalSort)
  .factory('mdtMakeListener', makeListenerFactory);


import {mdtTap} from './input-handlers';
app.directive('mdtTap', mdtTap);

import {MdtPromptService} from './services/prompt-service';
app.factory('mdtPromptService', upgradeAdapter
  .downgradeNg2Provider(MdtPromptService));

import {mdtPrompt, mdtPromptFile, mdtPromptBool,
  mdtPromptInput} from './prompt';

  app.directive('mdtPrompt', mdtPrompt)
  .directive('mdtPromptFile', mdtPromptFile)
  .directive('mdtPromptBool', mdtPromptBool)
  .directive('mdtPromptInput', mdtPromptInput);

import {MdtSandboxState } from './services/sandbox-service';
app.factory('mdtSandboxState', upgradeAdapter
  .downgradeNg2Provider(MdtSandboxState));

import {mdtSandbox} from './sandbox';
app .directive('mdtSandbox', mdtSandbox);

import {throttleNow, throttle, debounce} from './throttle';
app.factory('throttleNow', throttleNow)
  .factory('throttle', throttle)
  .factory('debounce', debounce);

import {TutorialFiles} from './tutorial';
app.service('tutorialFiles', TutorialFiles);
