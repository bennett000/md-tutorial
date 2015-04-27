/**
 * file: storage-spec.js
 * Created by michael on 06/04/15
 */

/*global window, jasmine, beforeEach, describe, expect, waitsFor, spyOn, runs,
 it, module,inject, workular, afterEach */


describe('prompt service', function() {
    'use strict';
    var prompt, scope, to;

    beforeEach(function() {
        module('md-tutorial');

        inject(function(mdtPromptService, $timeout, $rootScope) {
            prompt = mdtPromptService;
            to = $timeout;
            scope = $rootScope;
        });
    });

    it('bool should notify that its event', function() {
        var done = false;
        prompt.on('bool', function(label, yes, no) {
            expect(label).toBe('label');
            expect(yes).toBe('yes');
            expect(no).toBe('no');
            done = true;
        });
        prompt.bool('label', 'yes', 'no');
        to.flush();
        expect(done).toBe(true);
    });

    it('input should notify that its event', function() {
        var done = false;
        prompt.on('input', function(label) {
            expect(label).toBe('label');
            done = true;
        });
        prompt.input('label');
        to.flush();
        expect(done).toBe(true);
    });

    it('file should notify that its event', function() {
        var done = false;
        prompt.on('file', function() {
            done = true;
        });
        prompt.file('label');
        to.flush();
        expect(done).toBe(true);
    });

    it('bool should set the state', function() {
        expect(prompt.state()).toBe('off');
        prompt.bool('l', 'y', 'n');
        expect(prompt.state()).toBe('bool');
    });

    it('input should set the state', function() {
        expect(prompt.state()).toBe('off');
        prompt.input('l', 'y', 'n');
        expect(prompt.state()).toBe('input');
    });

    it('file should set the state', function() {
        expect(prompt.state()).toBe('off');
        prompt.file('l', 'y', 'n');
        expect(prompt.state()).toBe('file');
    });

    it('prompts should only work if state is off (file)', function() {
        var done = false;
        expect(prompt.state()).toBe('off');
        prompt.file('l', 'y', 'n');
        prompt.file().then(function() {
        }, function(err) {
            done = true;
        });
        to.flush();
        scope.$apply();
        expect(done).toBe(true);
    });

    it('prompts should only work if state is off (input)', function() {
        var done = false;
        expect(prompt.state()).toBe('off');
        prompt.input('l', 'y', 'n');
        prompt.input().then(function() {
        }, function(err) {
            done = true;
        });
        to.flush();
        scope.$apply();
        expect(done).toBe(true);
    });

    it('prompts should only work if state is off (bool)', function() {
        var done = false;
        expect(prompt.state()).toBe('off');
        prompt.bool('l', 'y', 'n');
        prompt.bool().then(function() {
        }, function(err) {
            done = true;
        });
        to.flush();
        scope.$apply();
        expect(done).toBe(true);
    });

    it('input should temporarily provide a cancel listener', function() {
        var done = false;
        prompt.input().then(function() {
        }, function() {
            done = true;
        });
        prompt.emit('cancel');
        to.flush();
        scope.$apply();
        expect(done).toBe(true);

        // confirm it's one time
        done = false;
        prompt.emit('cancel');
        to.flush();
        scope.$apply();
        expect(done).toBe(false);
    });

    it('file should temporarily provide a cancel listener', function() {
        var done = false;
        prompt.file().then(function() {
        }, function() {
            done = true;
        });
        prompt.emit('cancel');
        to.flush();
        scope.$apply();
        expect(done).toBe(true);

        // confirm it's one time
        done = false;
        prompt.emit('cancel');
        to.flush();
        scope.$apply();
        expect(done).toBe(false);
    });

    it('bool should temporarily listen to provideBool (true)', function() {
        var done = false;
        prompt.bool().then(function(val) {
            expect(val).toBe(true);
            done = true;
        });
        prompt.emit('provideBool', true);
        to.flush();
        scope.$apply();
        expect(done).toBe(true);

        // confirm it's one time
        done = false;
        prompt.emit('provideBool');
        to.flush();
        scope.$apply();
        expect(done).toBe(false);

    });

    it('bool should temporarily listen to provideBool (false)', function() {
        var done = false;
        prompt.bool().then(function(val) {
            expect(val).toBe(false);
            done = true;
        });
        prompt.emit('provideBool', false);
        to.flush();
        scope.$apply();
        expect(done).toBe(true);

        // confirm it's one time
        done = false;
        prompt.emit('provideBool');
        to.flush();
        scope.$apply();
        expect(done).toBe(false);

    });

    it('input should temporarily listen to provideInput', function() {
        var done = false;
        prompt.input().then(function(val) {
            expect(val).toBe('test');
            done = true;
        });
        prompt.emit('provideInput', 'test');
        to.flush();
        scope.$apply();
        expect(done).toBe(true);

        // confirm it's one time
        done = false;
        prompt.emit('provideInput');
        to.flush();
        scope.$apply();
        expect(done).toBe(false);

    });

    it('file should temporarily listen to provideFile', function() {
        var done = false;
        prompt.file().then(function(val) {
            expect(val).toBe('test');
            done = true;
        });
        prompt.emit('provideFile', 'test');
        to.flush();
        scope.$apply();
        expect(done).toBe(true);

        // confirm it's one time
        done = false;
        prompt.emit('provideFile');
        to.flush();
        scope.$apply();
        expect(done).toBe(false);
    });
});

describe('prompt directive', function() {
    'use strict';

    var scope, compile, prompt, defaultTemplate = '<mdt-prompt></mdt-prompt>';

    function create() {
        return compile(defaultTemplate)(scope);
    }

    beforeEach(function() {
        module('html/prompt-bool.html');
        module('html/prompt-input.html');
        module('html/prompt-file.html');
        module('md-tutorial');

        inject(function($rootScope, $compile, mdtPromptService) {
            scope = $rootScope;
            compile = $compile;
            prompt = mdtPromptService;
        });
    });

    it('should compile', function() {
        var el = create();
        expect(el).toBeTruthy();
    });

});

describe('prompt file directive', function() {
    'use strict';

    var scope, compile, prompt, to, files,
        defaultTemplate = '<mdt-prompt-file></mdt-prompt-file>';

    function create() {
        var el = compile(defaultTemplate)(scope);
        scope.$digest();
        return el;
    }

    function flush() {
        to.flush();
        scope.$apply();
    }

    beforeEach(function() {
        module('html/prompt-file.html');
        module('md-tutorial');

        inject(function($rootScope, $compile, mdtPromptService,
                        $timeout, mdtSandboxState) {
            scope = $rootScope;
            compile = $compile;
            prompt = mdtPromptService;
            to = $timeout;
            files = mdtSandboxState;
        });
    });

    it('should compile', function() {
        var el = create();
        expect(el).toBeTruthy();
    });

    it('should provide a state for marking file selection', function() {
        var el = create();
        expect(el.isolateScope().selected).toBeNull();
    });

    it('should update with the file list', function() {
        files.file('Booya', 'boo');
        var el = create();
        prompt.file();
        flush();
        expect(el.isolateScope().files[0]).toBe('Booya');
    });

    it('should select onClick', function() {
        var el = create();
        prompt.file();
        flush();
        el.isolateScope().onClick('Booya');
        expect(el.isolateScope().selected).toBe('Booya');
    });

    it('should de-select onClick second call to same item', function() {
        var el = create();
        prompt.file();
        flush();
        el.isolateScope().onClick('Booya');
        expect(el.isolateScope().selected).toBe('Booya');
        el.isolateScope().onClick('Booya');
        expect(el.isolateScope().selected).toBeNull();
    });

    it('should emit cancel on cancel', function() {
        var done = false, el;
        prompt.on('cancel', function () {
            done = true;
        });
        el = create();
        prompt.file();
        flush();
        el.isolateScope().cancel();
        expect(done).toBe(true);
    });

    it('should not emit provideFile on go if nothing is selected', function() {
        var done = false, el;
        prompt.on('provideFile', function (val) {
            expect(val).toBe('booya');
            done = true;
        });
        el = create();
        prompt.file();
        flush();
        el.isolateScope().go('booya');
        // verify it doesn't call (flush throws if no TO set)
        try {
            flush();
        } catch(e) {}
        expect(done).toBe(false);
    });

    it('should emit provideFile on go if selected', function() {
        var done = false, el;
        prompt.on('provideFile', function (val) {
            expect(val).toBe('booya');
            done = true;
        });
        el = create();
        prompt.file();
        flush();
        el.isolateScope().selected = 'booya';
        el.isolateScope().go();
        expect(done).toBe(true);
    });

});

describe('prompt input directive', function() {
    'use strict';

    var scope, compile, prompt, to,
        defaultTemplate = '<mdt-prompt-input></mdt-prompt-input>';

    function create() {
        var el = compile(defaultTemplate)(scope);
        scope.$digest();
        return el;
    }

    function flush() {
        to.flush();
        scope.$apply();
    }

    beforeEach(function() {
        module('html/prompt-input.html');
        module('md-tutorial');

        inject(function($rootScope, $compile, mdtPromptService, $timeout) {
            scope = $rootScope;
            compile = $compile;
            prompt = mdtPromptService;
            to = $timeout;
        });
    });

    it('should compile', function() {
        var el = create();
        expect(el).toBeTruthy();
    });

    it('should set label/show when called', function() {
        var el = create();
        prompt.input('Test');
        flush();
        expect(el.isolateScope().label).toBe('Test');
        expect(el.isolateScope().show).toBe(true);
    });

    it('should not signal provideInput if no data', function() {
        var el = create(), done = false;
        prompt.on('provideInput', function () {
            done = true;
        });
        prompt.input('Test');
        flush();
        el.isolateScope().go();
        try { flush(); } catch (e) {};
        expect(done).toBe(false);
    });

    it('should signal provideInput', function() {
        var el = create(), done = false;
        prompt.on('provideInput', function (i) {
            done = i;
        });
        prompt.input('Test');
        flush();
        el.isolateScope().data = 'booya';
        el.isolateScope().go();
        try { flush(); } catch (e) {};
        expect(done).toBe('booya');
    });

    it('should signal cancel', function() {
        var el = create(), done = false;
        prompt.on('cancel', function () {
            done = true;
        });
        prompt.input('Test');
        flush();
        el.isolateScope().cancel();
        expect(done).toBe(true);
    });
});

describe('prompt bool directive', function() {
    'use strict';

    var scope, compile, prompt, to,
        defaultTemplate = '<mdt-prompt-bool></mdt-prompt-bool>';

    function create() {
        var el = compile(defaultTemplate)(scope);
        scope.$digest();
        return el;
    }

    function flush() {
        try {
            to.flush();
            scope.$apply();
        } catch (e) {
        }
    }

    beforeEach(function() {
        module('html/prompt-bool.html');
        module('md-tutorial');

        inject(function($rootScope, $compile, mdtPromptService, $timeout) {
            scope = $rootScope;
            compile = $compile;
            prompt = mdtPromptService;
            to = $timeout;
        });
    });

    it('should listen for prompt', function() {
        var el = create();
        prompt.emitSync('bool', 'a', 'b', 'c');
        flush();
        expect(el).toBeTruthy();
        expect(el.isolateScope().label).toBe('a');
        expect(el.isolateScope().labelTrue).toBe('b');
        expect(el.isolateScope().labelFalse).toBe('c');
    });

    it('should provide true results', function() {
        var el = create(), result;
        prompt.on('provideBool', function (val) {
            result = val;
        });
        el.isolateScope().goTrue();
        flush();
        expect(result).toBe(true);
    });

    it('should provide false results', function() {
        var el = create(), result;
        prompt.on('provideBool', function (val) {
            result = val;
        });
        el.isolateScope().goFalse();
        flush();
        expect(result).toBe(false);
    });
});
