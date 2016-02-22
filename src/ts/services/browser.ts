// References for browser wrappers
import {Injectable} from 'angular2/core';
import {safeCall} from './common';

const prefix = 'mdt' + window.location.pathname;

@Injectable()
export class LocalStorage {
  storage = window.localStorage;

  public set(key: string, value: string) {
    return this.storage.setItem(prefix + key, value);
  }

  public get(key: string) {
    return this.storage.getItem(prefix + key);
  }

  public list(subPrefix?: string, callback?: Function): string[] {
    const result = [];
    let key: string,
      i: number;

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

  public remove(key: string) {
    return this.storage.removeItem(prefix + key);
  }

  public removeAll(): void {
    const toRemove = [];

    this.list(null, function (error, key) {
      toRemove.push(key);
    });

    toRemove.forEach(this.remove.bind(this));
  }

  public length(): number {
    let len: number = 0;

    this.list(null, function () {
      len += 1;
    });

    return len;
  }
}

