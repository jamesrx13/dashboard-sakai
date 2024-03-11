export class StorageManagger {

    public setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public getItem(key: string, asJson: boolean = false) {
        return asJson ? JSON.parse(localStorage.getItem(key) || '{}') : localStorage.getItem(key)
    }

    public removeItem(key: string) {
        localStorage.removeItem(key);
    }

    public clear() {
        localStorage.clear();
    }    

}