import {defaultMode} from '../constants';
import {Injectable, Inject} from 'angular2/core';

@Injectable()
export class MdtMenuState {
  states = {
    selected: defaultMode,
    toggle: ''
  };

  constructor(@Inject('mdtMakeListener') mdtMakeListener) {
      mdtMakeListener(this);
  }

  emit(signal: string, ...values: any[]) {}
  emitSync(signal: string, value?: any) {}
  on(signal: string, callback: Function) {}

  access(prop, val?: string):string {
    if (val === undefined) {
      return this.states[prop];
    }
    this.states[prop] = val;
    this.emitSync(prop, val);
    return this.states[prop];
  }

   current(val?: string) {
    return this.access('selected', val);
  }

  onSelect(cb) {
    return this.on('selected', cb);
  }

  onToggle(cb) {
    return this.on('toggle', cb);
  }

  toggle(val?:string) {
    return this.access('toggle', val);
  }

  onPrompt(cb) {
    return this.on('prompt', cb);
  }

  prompt(val?:string) {
    return this.access('prompt', val);
  }
}