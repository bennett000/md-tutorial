///<reference path="./md-tutorial.ts" />
module mdTutorial {
    // *NOTE* angular export is at the bottom
    var menus = {
        load: {
            label: 'Load',
            args: '/load',
            fn: 'go',
            icon: '/img/icons/question-mark.svg',
            onMenu: 'secondary'
        },
        saveAs: {
            label: 'About',
            args: '/about',
            fn: 'go',
            icon: '/img/icons/question-mark.svg',
            onMenu: 'secondary'
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
