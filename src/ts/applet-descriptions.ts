///<reference path="./md-tutorial.ts" />
module mdTutorial {
    // *NOTE* angular export is at the bottom
    var applets = {
        about: {
            label: 'About',
            path: '/about',
            icon: '/img/icons/question-mark.svg',
            controller: 'About',
            controllerAs: 'about',
            template: 'html/about.html',
            onMenu: 'secondary'
        },
        sandbox: {
            label: 'Sandbox',
            path: '/sandbox',
            icon: 'img/icons/pencil.svg',
            controller: 'Sandbox',
            controllerAs: 'sandbox',
            template: 'html/sandbox.html',
            onMenu: 'primary'
        },
        tutorial: {
            label: 'Tutorial',
            path: '/tutorial',
            icon: 'img/icons/location.svg',
            controller: 'Tutorial',
            controllerAs: 'tutorial',
            template: 'html/tutorial.html',
            onMenu: 'primary'
        },
        reference: {
            label: 'Reference',
            path: '/reference',
            icon: 'img/icons/book.svg',
            controller: 'Reference',
            controllerAs: 'reference',
            template: 'html/reference.html',
            onMenu: 'primary'
        }
    };

    app.constant('applets', applets);
}
