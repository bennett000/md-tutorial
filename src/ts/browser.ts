// References for browser wrappers
import {safeCall} from './common';


/** @ngInject */
export function createLocalStorage() {
  return new LocalStorage();
}

const prefix = 'mdt' + window.location.pathname;

class StorageWrapper {
  storage:Storage;

  constructor(storage) {
    this.storage = storage;
  }

  set(key:string, value:string) {
    return this.storage.setItem(prefix + key, value);
  }

  get(key:string) {
    return this.storage.getItem(prefix + key);
  }

  list(subPrefix?:string, callback?:Function):string[] {
    const result = [];
    let key:string,
      i:number;

    // if falsey, force string
    subPrefix = subPrefix || '';

    for (i = 0; i < this.storage.length; i += 1) {
      key = this.storage.key(i);
      if (key.indexOf(prefix + subPrefix) === 0) {
        key = key.slice(prefix.length);
        result.push(key);
        safeCall(callback, [null, key], this);
      }
    }
    return result;
  }

  remove(key:string) {
    return this.storage.removeItem(prefix + key);
  }

  removeAll():void {
    const toRemove = [];

    this.list(null, function (error, key) {
      toRemove.push(key);
    });

    toRemove.forEach(this.remove.bind(this));
  }

  length():number {
    let len:number = 0;

    this.list(null, function () {
      len += 1;
    });

    return len;
  }
}

class LocalStorage extends StorageWrapper {
  constructor() {
    super(window.localStorage);
  }
}


