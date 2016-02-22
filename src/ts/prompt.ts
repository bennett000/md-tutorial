import {promptStates} from './constants';

export function MdtPromptService($q, mdtMakeListener) {
  const that = mdtMakeListener(this);
  let state:string = promptStates.off;

  this.input = promptInput;
  this.file = promptFile;
  this.bool = promptBool;
  this.state = getState;

  function getState():string {
    return state;
  }

  function promptBool(label:string, labelTrue:string, labelFalse:string) {
    const d = $q.defer();
    let input;
    if (state !== promptStates.off) {
      d.reject(new Error('promptInput: Prompt in progress'));
      return d.promise;
    }
    state = promptStates.bool;
    that.emit(promptStates.bool, label, labelTrue, labelFalse);
    function cleanUp() {
      input();
      state = promptStates.off;
      that.emit('hide');
    }

    input = that.on('provideBool', function (input) {
      d.resolve(input);
      cleanUp();
    });
    return d.promise;
  }

  function promptInput(label:string) {
    const d = $q.defer();
    let input, cancel;
    if (state !== promptStates.off) {
      d.reject(new Error('promptInput: Prompt in progress'));
      return d.promise;
    }
    state = promptStates.input;
    that.emit(promptStates.input, label);
    function cleanUp() {
      input();
      cancel();
      state = promptStates.off;
      that.emit('hide');
    }

    input = that.on('provideInput', function (input) {
      d.resolve(input);
      cleanUp();
    });
    cancel = that.on('cancel', function () {
      d.reject(new Error('promptInput: Cancelled'));
      cleanUp();
    });
    return d.promise;
  }

  function promptFile(label:string) {
    const d = $q.defer();
    let input, cancel;
    if (state !== promptStates.off) {
      d.reject(new Error('promptFile: Prompt in progress'));
      return d.promise;
    }
    state = promptStates.file;
    that.emit(promptStates.file, label);
    function cleanUp() {
      input();
      cancel();
      state = promptStates.off;
      that.emit('hide');
    }

    input = that.on('provideFile', function (filename) {
      d.resolve(filename);
      cleanUp();
    });
    cancel = that.on('cancel', function () {
      d.reject(new Error('promptInput: Cancelled'));
      cleanUp();
    });
    return d.promise;
  }
}
MdtPromptService.$inject = ['$q', 'mdtMakeListener'];

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
      scope.show = mdtPromptService.state() === promptStates.file;
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
      scope.show = mdtPromptService.state() === promptStates.input;
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
      scope.show = mdtPromptService.state() === promptStates.bool;
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
