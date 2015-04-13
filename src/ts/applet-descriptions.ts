///<reference path="./md-tutorial.ts" />
module mdTutorial {
    // *NOTE* angular export is at the bottom
    var applets = {
        about: {
            label: 'About',
            path: '/about',
            icon: '/img/icons/question-mark.svg',
            controller: 'Sandbox',
            controllerAs: 'sandbox',
            template: 'html/sandbox.html',
            onMenu: false
        },
        sandbox: {
            label: 'Sandbox',
            path: '/sandbox',
            icon: 'img/icons/pencil.svg',
            controller: 'Sandbox',
            controllerAs: 'sandbox',
            template: 'html/sandbox.html',
            onMenu: true
        },
        tutorial: {
            label: 'Tutorial',
            path: '/tutorial',
            icon: 'img/icons/location.svg',
            controller: 'Tutorial',
            controllerAs: 'tutorial',
            template: 'html/tutorial.html',
            onMenu: true
        },
        reference: {
            label: 'Reference',
            path: '/reference',
            icon: 'img/icons/book.svg',
            controller: 'Reference',
            controllerAs: 'reference',
            template: 'html/reference.html',
            onMenu: true
        }
    };

    app.constant('applets', applets);
}
