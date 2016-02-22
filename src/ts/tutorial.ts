
export function TutorialFiles($http, $q, mdtTutorial) {
  const gets = [], files = [];

  mdtTutorial.forEach(function (tutorial) {
    gets.push($http.get('md/tutorial/' + tutorial.filename));
  });

  const initPromise = $q.all(gets).then(function (chapters) {
    chapters.forEach(function (result) {
      files.push(result.data);
    });
  });
}
TutorialFiles.$inject = ['$http', '$q', 'mdtTutorial'];

function TutorialStates() {

}
