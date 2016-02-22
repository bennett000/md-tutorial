/**
 * file: md-tutorial.ts
 * Created by michael on 28/03/15.
 */

import {promptStates} from './constants';

export const appFlags = {
  worker: {
    error: null,
    is: false
  },
  storage: {
    error: null,
    is: false
  }
};

export function Sandbox($scope, mdtMenuState, mdtSandboxState, newFileLabel) {
  function setToggles() {
    let toggleString = '';
    const cur = mdtSandboxState.current();
    if (!mdtSandboxState.list().length) {
      toggleString += 'hide-load';
    }
    if (!mdtSandboxState.file(cur)) {
      toggleString += 'hide-save-as hide-email hide-download';
    }
    // if it's a new file, and it's empty remove is invisible
    if (!mdtSandboxState.file(cur) && (cur === newFileLabel)) {
      toggleString += 'hide-save-as hide-email hide-download ' +
        'hide-remove hide-new';
    }
    mdtMenuState.toggle(toggleString);
  }

  setToggles();
  this.setToggles = setToggles;
  $scope.$on('$destroy', mdtSandboxState.onUpdate(setToggles));
}
Sandbox.$inject = ['$scope', 'mdtMenuState', 'mdtSandboxState', 'newFileLabel'];

export function NonSavingController(mdtMenuState, mdtMenus) {
  let toggleString = '';
  Object.keys(mdtMenus).forEach(function (name) {
    if (!mdtMenus[name].toggle) {
      return;
    }
    toggleString += mdtMenus[name].toggle + ' ';
  });
  mdtMenuState.toggle(toggleString);
}
NonSavingController.$inject = ['mdtMenuState', 'mdtMenus'];

export function configureRoutes($routeProvider, mdtApplets) {
  //$routeProvider.when('/', {
  //    templateUrl: 'html/root.html',
  //    controller: 'FirstTime',
  //    controllerAs: 'firstTime'
  //});

  Object.keys(mdtApplets).forEach(function (applet) {
    const a = mdtApplets[applet];
    $routeProvider.when(a.path, {
      template: a.template,
      controller: a.controller,
      controllerAs: a.controllerAs
    });
  });
  $routeProvider.otherwise({
    redirectTo: '/sandbox'
  });
}
configureRoutes.$inject = ['$routeProvider', 'mdtApplets'];


export function frameDirective(mdtMenuState, mdtPromptService) {

  function linkFn(scope:any) {
    const listenToggle = mdtMenuState.onToggle(update),
      liShow = mdtPromptService.on(promptStates.input, doShow),
      lfShow = mdtPromptService.on(promptStates.file, doShow),
      lbShow = mdtPromptService.on(promptStates.bool, doShow),
      lHide = mdtPromptService.on('hide', doHide);

    update(mdtMenuState.toggle());

    scope.$on('$destroy', destroy);
    scope.prompt = !(mdtPromptService.state() === promptStates.off);

    function update(val) {
      scope.toggle = val;
    }

    function destroy() {
      listenToggle();
      liShow();
      lfShow();
      lbShow();
      lHide();
    }

    function doShow() {
      scope.prompt = true;
    }

    function doHide() {
      scope.prompt = false;
    }
  }

  return {
    scope: {},
    link: linkFn,
    template: require('../html/frame.html')
  };
}
frameDirective.$inject = ['mdtMenuState', 'mdtPromptService'];
