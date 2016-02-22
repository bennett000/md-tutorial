import {Injectable, Inject} from 'angular2/core';
import {promptStates} from '../constants';

@Injectable()
export class MdtPromptService {

  state: string = promptStates.off;
  constructor(@Inject('mdtMakeListener') mdtMakeListener) {
    mdtMakeListener(this);
  }

  emit(signal: string, ...rest: any[]) {}
  emitSync(signal: string, value?: any) {}
  on(signal: string, callback: Function) {}

  getState(): string {
    return this.state;
  }

  promptBool(label: string, labelTrue: string, labelFalse: string) {
    return new Promise((resolve, reject) => {
      let input;
      if (this.state !== promptStates.off) {
        reject(new Error('promptInput: Prompt in progress'));
        return;
      }
      this.state = promptStates.bool;
      this.emit(promptStates.bool, label, labelTrue, labelFalse);
      function cleanUp() {
        input();
        this.state = promptStates.off;
        this.emit('hide');
      }

      input = this.on('provideBool', function (input) {
        resolve(input);
        cleanUp();
      });
    });
  }

  promptInput(label: string) {
    return new Promise((resolve, reject) => {
      let input, cancel;
      if (this.state !== promptStates.off) {
        reject(new Error('promptInput: Prompt in progress'));
        return;
      }
      this.state = promptStates.input;
      this.emit(promptStates.input, label);
      function cleanUp() {
        input();
        cancel();
        this.state = promptStates.off;
        this.emit('hide');
      }

      input = this.on('provideInput', function (input) {
        resolve(input);
        cleanUp();
      });
      cancel = this.on('cancel', function () {
        reject(new Error('promptInput: Cancelled'));
        cleanUp();
      });
    });
  }

  promptFile(label: string) {
    return new Promise((resolve, reject) => {
      let input, cancel;
      if (this.state !== promptStates.off) {
        reject(new Error('promptFile: Prompt in progress'));
        return;
      }
      this.state = promptStates.file;
      this.emit(promptStates.file, label);
      function cleanUp() {
        input();
        cancel();
        this.state = promptStates.off;
        this.emit('hide');
      }

      input = this.on('provideFile', function (filename) {
        resolve(filename);
        cleanUp();
      });
      cancel = this.on('cancel', function () {
        reject(new Error('promptInput: Cancelled'));
        cleanUp();
      });
    });
  }
}
