// References for browser wrappers
///<reference path="./main.ts" />
module mdTutorial {
    app.factory('localStorage', function () {
        return new LocalStorage();
    });

    var prefix = 'mdt' + window.location.pathname;

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
            var key:string,
                i:number,
                result = [];

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
            var key:string,
                toRemove:Array<string> = [], i:number;

            this.list(null, function (error, key) {
                toRemove.push(key);
            });
            toRemove.forEach(this.remove.bind(this));
        }

        length():number {
            var len:number = 0, key:string, i:number;

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

}
