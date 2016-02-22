/**
 * Created by michael on 29/03/15.
 */
import {newFileLabel} from './constants';

export function mdtAppletSelector() {
  return {
    restrict: 'E',
    replace: true,
    template: require('../html/applet-selector.html')
  };
}

export function MdtMenuFunctions($window, $location, mdtMenuState,
                                 mdtSandboxState, mdtMarked, mdtPromptService) {

  function go(args, label) {
    $location.path(args);
    mdtMenuState.current(label);
  }

  function remove() {
    const cur = mdtSandboxState.current();
    if (cur === newFileLabel) {
      return resetNewFile();
    }
    mdtPromptService.bool(
      'Permanently Remove ' + cur + '?',
      'Remove',
      'Keep'
    ).then(function (val) {
      if (!val) {
        return;
      }
      mdtSandboxState.remove(cur);
      mdtSandboxState.current(newFileLabel);
    });
  }

  function promptSaveAs() {
    /** @todo Save As string from data */
    mdtPromptService.input('Save As').then(function (input) {
      const exists = mdtSandboxState.file(input);
      const cur = mdtSandboxState.current();
      if (exists) {
        mdtPromptService.bool(
          'Overwrite File: ' + input + '?',
          'Overwrite',
          'Cancel'
        ).then(function (val) {
          if (!val) {
            return;
          }
          save();
        });
      } else {
        save();
      }

      function save() {
        mdtSandboxState.file(
          input,
          mdtSandboxState.file(mdtSandboxState.current())
        );
        if (cur === newFileLabel) {
          mdtSandboxState.file(cur, '');
        }
        mdtSandboxState.current(input);
      }
    });
  }

  function resetNewFile() {
    mdtPromptService.bool(
      'Reset the new file, and lose all changes?',
      'Reset',
      'Keep'
    ).then(function (val) {
      if (!val) {
        return;
      }
      mdtSandboxState.file(newFileLabel, '');
    });
  }

  function promptNew() {
    const cur = mdtSandboxState.current();
    let data;
    if (cur === newFileLabel) {
      data = mdtSandboxState.file(cur);
      if (data) {
        resetNewFile();
      }
    } else {
      mdtSandboxState.current(newFileLabel);
    }
  }

  function promptLoad() {
    mdtPromptService.file('Load').then(function (input) {
      mdtSandboxState.current(input);
    });
  }

  function validateSaveCall(cur) {
    const data = mdtSandboxState.file(cur);
    if (!data) {
      return null;
    }
    return data;
  }

  function getLabel(cur, data) {
    if (cur === newFileLabel) {
      return data.slice(0, data.indexOf('\n'));
    } else {
      return cur;
    }
  }

  function email() {
    const cur = mdtSandboxState.current();
    let data = validateSaveCall(cur),
      subject = '';
    if (!data) {
      return;
    }
    subject = getLabel(cur, data);
    $window.location.href = ['mailto:?subject=',
      encodeURIComponent(subject),
      '&body=', encodeURIComponent(data)].join('');
  }

  function download() {
    const cur = mdtSandboxState.current();
    const data = validateSaveCall(cur);
    let filename = '';
    filename = getLabel(cur, data);
    mdtMarked.render(data).then(function (html) {
      const uriContent = "data:application/octet-stream," +
        encodeURIComponent(html);
      /*global window*/
      window.open(uriContent, filename + '.html');
    }, function (err) {
      /** @todo error system */
      console.warn(err.message);
    });
  }

  this.go = go;
  this.email = email;
  this.download = download;
  this.remove = remove;
  this.promptLoad = promptLoad;
  this.promptSaveAs = promptSaveAs;
  this.promptNew = promptNew;
}
MdtMenuFunctions.$inject = ['$window', '$location', 'mdtMenuState',
  'mdtSandboxState', 'mdtMarked', 'mdtPromptService'];

export function mdtAppletSelectors(mdtMenus, mdtMenuState, mdtMenuFunctions) {

  function getOnMenu(name:string) {
    /**
     * @param {string} applet
     */
    function onMenu(menu):boolean {
      return mdtMenus[menu].onMenu === name;
    }

    return onMenu;
  }


  function linkFn(scope:any) {
    let listenSelect, listenToggle;

    scope.toggle = '';
    scope.selectors = Object.keys(mdtMenus).
    filter(getOnMenu(scope.mdtMenu)).map(function (menu):any {
      const a = mdtMenus[menu];
      return {
        icon: a.icon,
        fn: a.fn,
        args: a.args,
        label: a.label,
        tabindex: a.tabindex,
        toggle: a.toggle
      }
    });
    scope.select = select;
    scope.selected = mdtMenuState.current();
    scope.toggle = mdtMenuState.toggle();

    listenSelect = mdtMenuState.onSelect(updateSelect);
    listenToggle = mdtMenuState.onToggle(updateToggle);

    function updateSelect(val) {
      scope.selected = val;
    }

    function updateToggle(val) {
      scope.toggle = val;
    }

    function select(fn:string, args:string, label:string) {
      if (!mdtMenuFunctions[fn]) {
        // @todo warn
        return;
      }
      mdtMenuFunctions[fn](args, label);
    }

    function destroy() {
      listenSelect();
      listenToggle();
    }

    scope.$on('$destroy', destroy);
  }

  return {
    restrict: 'E',
    replace: true,
    link: linkFn,
    scope: {
      mdtMenu: '@'
    },
    template: '<div class="mdt-applet-selectors"><mdt-applet-selector ' +
    'ng-repeat="selector in selectors"></mdt-applet-selector></div>'
  };
}
mdtAppletSelectors.$inject = ['mdtMenus', 'mdtMenuState', 'mdtMenuFunctions'];
