import {Injectable, Inject} from 'angular2/core';
import {newFileLabel} from '../constants';
import {LocalStorage} from './browser';
import {naturalSort} from './common';

const prefix = 'sandbox-';

@Injectable()
export class MdtSandboxState {
  storage = {};
  currentFile: string = newFileLabel;

  constructor(private localStorage: LocalStorage,
              @Inject('mdtMakeListener') mdtMakeListener) {
    mdtMakeListener(this)
  }

  emit(signal: string, ...values: any[]) {}
  emitSync(signal: string, value?: any) {}
  on(signal: string, callback: Function) {}

  list(): string[] {
    return this.localStorage.list(prefix).map(function (fileName) {
      return fileName.slice(prefix.length);
    }).filter(function (fileName) {
      return fileName != newFileLabel;
    }).sort(naturalSort);
  }

  file(name: string, value?: string): string {
    if (!name) {
      return '';
    }
    if (value === undefined) {
      if (this.storage[name]) {
        return this.storage[name];
      }
      this.storage[name] = this.localStorage.get(prefix + name);
      return this.storage[name];
    }
    if (this.storage[name] === value) {
      return this.storage[name];
    }
    this.storage[name] = value;
    this.localStorage.set(prefix + name, value);
    this.emitSync('update');
    return this.storage[name];
  }

  update() {
    this.emitSync('update');
  }

  current(name?:string): string {
    if (name === undefined) {
      return this.currentFile;
    }
    this.currentFile = name;
    this.update();
    return this.currentFile;
  }

  remove(name:string): void {
    if (this.storage[name]) {
      delete this.storage[name];
    }
    this.localStorage.remove(prefix + name);
  }

  onUpdate(callback:Function): void {
    return this.on('update', callback);
  }

  /**
   * @param {string} oldName
   * @param {string} newName
   * @param {boolean} overwrite
   * @return {string} '' for success otherwise an error string
   */
  saveAs(oldName, newName, overwrite?: boolean): string {
    if (!this.file(oldName)) {
      return 'file ' + oldName + ' not found';
    }
    if (!overwrite) {
      if (this.file(newName)) {
        return 'file ' + newName + ' exists';
      }
    }
    this.file(newName, this.file(oldName));
    // if the file being saved was the "new file" reset it
    if (oldName === newFileLabel) {
      this.file(newFileLabel, '');
    }
    return '';
  }
}

