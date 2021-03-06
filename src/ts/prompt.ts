import {promptStates} from './constants';

export function mdtPrompt() {
  return {
    restrict: 'E',
    template: '<div><mdt-prompt-input></mdt-prompt-input><mdt-prompt-file></mdt-prompt-file><mdt-prompt-bool></mdt-prompt-bool></div>'
  };
}
mdtPrompt.$inject = [];

export function mdtPromptFile(mdtPromptService, mdtSandboxState) {
  function linkFn(scope, el) {
    const promptListener = mdtPromptService.on(promptStates.file,
      onPrompt);

    reset();

    el.on('$destroy', destroy);
    scope.files = [];
    scope.go = go;
    scope.cancel = cancel;
    scope.onClick = onClick;
    scope.selected = null;

    function reset() {
      scope.files = [];
      scope.label = '';
      scope.show = mdtPromptService.state === promptStates.file;
    }

    function onPrompt(label:string) {
      scope.files = mdtSandboxState.list();
      scope.label = label;
      scope.show = true;
    }

    function onClick(filename) {
      if (scope.selected === filename) {
        scope.selected = null;
      } else {
        scope.selected = filename;
      }
    }

    function destroy() {
      promptListener();
    }

    function go() {
      if (scope.selected === null) {
        return;
      }
      mdtPromptService.emitSync('provideFile', scope.selected);
      reset();
    }

    function cancel() {
      mdtPromptService.emitSync('cancel', scope.data);
      reset();
    }
  }

  return {
    restrict: 'E',
    link: linkFn,
    scope: {},
    template: require('../html/prompt-file.html')
  };
}
mdtPromptFile.$inject = ['mdtPromptService', 'mdtSandboxState'];


export function mdtPromptInput(mdtPromptService, $timeout) {

  function linkFn(scope, el) {
    const promptListener = mdtPromptService.on(promptStates.input,
      onPrompt);

    reset();

    el.on('$destroy', destroy);
    scope.go = go;
    scope.cancel = cancel;

    function reset() {
      scope.data = '';
      scope.label = '';
      scope.show = mdtPromptService.state === promptStates.input;
    }

    function onPrompt(label:string) {
      scope.data = '';
      scope.label = label;
      scope.show = true;
      const input = angular.element(el[0].children[0]).children()[0];
      // skip a turn so the element gets drawn
      $timeout(function () {
        input.focus();
      }, 0);
    }

    function destroy() {
      promptListener();
    }

    function go() {
      if (!scope.data) {
        return;
      }
      mdtPromptService.emitSync('provideInput', scope.data);
      reset();
    }

    function cancel() {
      mdtPromptService.emitSync('cancel', scope.data);
      reset();
    }
  }

  return {
    restrict: 'E',
    link: linkFn,
    scope: {},
    template: require('../html/prompt-input.html')
  };
}
mdtPromptInput.$inject = ['mdtPromptService', '$timeout'];

export function mdtPromptBool(mdtPromptService) {

  function linkFn(scope, el) {
    const promptListener = mdtPromptService.on(promptStates.bool,
      onPrompt);

    reset();

    el.on('$destroy', destroy);
    scope.goTrue = goTrue;
    scope.goFalse = goFalse;

    function reset() {
      scope.label = '';
      scope.labelTrue = '';
      scope.labelFalse = '';
      scope.show = mdtPromptService.state === promptStates.bool;
    }

    function onPrompt(label:string, labelTrue:string,
                      labelFalse:string) {
      scope.label = label;
      scope.labelTrue = labelTrue;
      scope.labelFalse = labelFalse;
      scope.show = true;
    }

    function destroy() {
      promptListener();
    }

    function goTrue() {
      mdtPromptService.emitSync('provideBool', true);
      reset();
    }

    function goFalse() {
      mdtPromptService.emitSync('provideBool', false);
      reset();
    }
  }

  return {
    restrict: 'E',
    link: linkFn,
    scope: {},
    template: require('../html/prompt-bool.html')
  };
}
mdtPromptBool.$inject = ['mdtPromptService'];
