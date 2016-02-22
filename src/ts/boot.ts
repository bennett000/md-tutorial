require('../scss/md-tutorial.scss');

import {frameDirective, appFlags, configureRoutes, Sandbox,
  NonSavingController} from './main';

export const app = angular.module('md-tutorial', ['ngRoute', 'ngAria'])
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


import {MdtMenuState, MdtMenuFunctions, mdtAppletSelector,
  mdtAppletSelectors} from './menus';

app.service('mdtMenuState', MdtMenuState)
  .service('mdtMenuFunctions', MdtMenuFunctions)
  .directive('mdtAppletSelector', mdtAppletSelector)
  .directive('mdtAppletSelectors', mdtAppletSelectors);

import {markedFactory} from './markdown';
app.service('mdtMarked', markedFactory);

import {createLocalStorage} from './browser';
app.factory('localStorage', createLocalStorage);

import {safeCall, naturalSort, makeListenerFactory} from './common';
app.value('mdtSafeCall', safeCall)
  .value('mdtNaturalSort', naturalSort)
  .factory('mdtMakeListener', makeListenerFactory);


import {mdtTap} from './input-handlers';
app.directive('mdtTap', mdtTap);

import {MdtPromptService, mdtPrompt, mdtPromptFile, mdtPromptBool,
  mdtPromptInput} from './prompt';
app.service('mdtPromptService', MdtPromptService)
  .directive('mdtPrompt', mdtPrompt)
  .directive('mdtPromptFile', mdtPromptFile)
  .directive('mdtPromptBool', mdtPromptBool)
  .directive('mdtPromptInput', mdtPromptInput);


import {MdtSandboxState, mdtSandbox} from './sandbox';
app.service('mdtSandboxState', MdtSandboxState)
  .directive('mdtSandbox', mdtSandbox)
  .constant('newFileLabel', '__new __file');

import {throttleNow, throttle, debounce} from './throttle';
app.factory('throttleNow', throttleNow)
  .factory('throttle', throttle)
  .factory('debounce', debounce);

import {TutorialFiles} from './tutorial';
app.service('tutorialFiles', TutorialFiles);
