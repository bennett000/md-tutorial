///<reference path="./md-tutorial.ts" />
module mdTutorial {
    // *NOTE* angular export is at the bottom
    var menus = {
        about: {
            label: 'About',
            args: '/about',
            fn: 'go',
            icon: '/img/icons/question-mark.svg',
            onMenu: 'secondary'
        },
        remove: {
            label: 'Remove',
            args: '',
            fn: 'remove',
            icon: '/img/icons/trash.svg',
            onMenu: 'secondary',
            toggle: 'hide-remove'
        },
        mailto: {
            label: 'Send',
            args: '',
            fn: 'email',
            icon: '/img/icons/envelope-closed.svg',
            onMenu: 'secondary',
            toggle: 'hide-email'
        },
        download: {
            label: 'Download',
            args: '',
            fn: 'download',
            icon: '/img/icons/data-transfer-download.svg',
            onMenu: 'secondary',
            toggle: 'hide-download'
        },
        saveAs: {
            label: 'Save As',
            args: '',
            fn: 'promptSaveAs',
            icon: '/img/icons/file.svg',
            onMenu: 'secondary',
            toggle: 'hide-save-as'
        },
        load: {
            label: 'Load',
            args: '',
            fn: 'promptLoad',
            icon: '/img/icons/folder.svg',
            onMenu: 'secondary',
            toggle: 'hide-load'
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
