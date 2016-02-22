export const applets = {
  about: {
    path: '/about',
    controller: 'About',
    controllerAs: 'about',
    template: require('../html/about.html')
  },
  sandbox: {
    path: '/sandbox',
    controller: 'Sandbox',
    controllerAs: 'sandbox',
    template: require('../html/sandbox.html')
  },
  tutorial: {
    path: '/tutorial',
    controller: 'Tutorial',
    controllerAs: 'tutorial',
    template: require('../html/tutorial.html')
  },
  reference: {
    path: '/reference',
    controller: 'Reference',
    controllerAs: 'reference',
    template: require('../html/reference.html')
  }

};
