///<reference path="./main.ts" />
module mdTutorial {
    // *NOTE* angular export is at the bottom
    var applets = {
            about: {
                path: '/about',
                controller: 'About',
                controllerAs: 'about',
                template: 'html/about.html'
            },
            sandbox: {
                path: '/sandbox',
                controller: 'Sandbox',
                controllerAs: 'sandbox',
                template: 'html/sandbox.html'
            },
            tutorial: {
                path: '/tutorial',
                controller: 'Tutorial',
                controllerAs: 'tutorial',
                template: 'html/tutorial.html'
            },
            reference: {
                path: '/reference',
                controller: 'Reference',
                controllerAs: 'reference',
                template: 'html/reference.html'
            }

        };

    app.constant('mdtApplets', applets);
}
