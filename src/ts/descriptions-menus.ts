///<reference path="./md-tutorial.ts" />
module mdTutorial {
    // *NOTE* angular export is at the bottom
    var menus = {
        saveAs: {
            label: 'Save As',
            args: '',
            fn: 'saveAs',
            icon: '/img/icons/file.svg',
            onMenu: 'secondary',
            toggle: 'hide-save-as'
        },
        load: {
            label: 'Load',
            args: '',
            fn: 'load',
            icon: '/img/icons/folder.svg',
            onMenu: 'secondary',
            toggle: 'hide-load'
        },
        about: {
            label: 'About',
            args: '/about',
            fn: 'go',
            icon: '/img/icons/question-mark.svg',
            onMenu: 'secondary'
        },
        sandbox: {
            label: 'Sandbox',
            args: '/sandbox',
            fn: 'go',
            icon: 'img/icons/pencil.svg',
            onMenu: 'primary'
        },
        tutorial: {
            label: 'Tutorial',
            args: '/tutorial',
            fn: 'go',
            icon: 'img/icons/location.svg',
            onMenu: 'primary'
        },
        reference: {
            label: 'Reference',
            args: '/reference',
            fn: 'go',
            icon: 'img/icons/book.svg',
            onMenu: 'primary'
        }
    };
    app.constant('mdtMenus', menus);
}
