///<reference path="./main.ts" />
module mdTutorial {
    // *NOTE* angular export is at the bottom
    var tutorial = [
        {
            md: '0-intro.md'
        }, {
            md: '1-workflow.md'
        }, {
            md: '2-basics-headings.md'
        }
    ];

    app.constant('mdtTutorial', tutorial);
}
