// References for browser wrappers


module mdTutorial {
    app.factory('localStorage', function ( ){
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
        remove(key:string) {
            return this.storage.removeItem(prefix + key);
        }
        removeAll():void {
            var key:string,
                toRemove:Array<string> = [], i:number;

            for (i  = 0; i < this.storage.length; i += 1) {
                key = this.storage.key(i);
                if (key.indexOf(prefix) === 0) {
                    toRemove.push(key.slice(prefix.length));
                }
            }
            toRemove.forEach(this.remove.bind(this));
        }
        length():number {
            var len:number = 0, key:string, i:number;

            for (i = 0; i < this.storage.length; i += 1) {
                key = this.storage.key(i);
                if (key.indexOf(prefix) === 0) {
                    len += 1;
                }
            }

            return len;
        }
    }

    class LocalStorage extends StorageWrapper {
        constructor() {
            super(window.localStorage);
        }
    }

}
