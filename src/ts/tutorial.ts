///<reference path="./main.ts" />
module mdTutorial {
    app.service('tutorialFiles', TutorialFiles).run(function (tutorialFiles) {

    });

    /** @ngInject */
    function TutorialFiles($http, $q, mdtTutorial) {
        var gets = [], files = [], initPromise;

        mdtTutorial.forEach(function (tutorial) {
            gets.push($http.get('md/tutorial/' + tutorial.filename));
        });

        initPromise = $q.all(gets).then(function (chapters) {
            chapters.forEach(function (result) {
                files.push(result.data);
            });
        });
    }

    /** @ngInject */
    function TutorialStates() {

    }
}
