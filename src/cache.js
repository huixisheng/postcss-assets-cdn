import fs from 'fs';

export default class Cache {
    constructor(options) {
        this.cache = options.cache;
    }

    get(key) {
        const cacheJson = this.readCache();
        return cacheJson[key] || {};
    }

    set(key, value) {
        if (this.hasCache(key)) {
            return;
        }
        const cacheJson = this.readCache();
        cacheJson[key] = value;
        this.writeCache(cacheJson);
    }

    readCache() {
        const result = {};
        if (fs.existsSync(this.cache)) { 
            const content = fs.readFileSync(this.cache, {
                encoding: 'utf-8'
            });
            try {
                return JSON.parse(content);
            } catch (error) {
                console.log('readCache', error);
                return result;
            }
        }
        return result;
    }

    writeCache(params) {
        let content = '';
        if (typeof params === 'string') {
            content = params;
        } else if (typeof params === 'object' && params !== null) {
            content = JSON.stringify(params, null, 4);
        }
        console.log(this.cache);
        fs.writeFileSync(this.cache, content);
    }

    hasCache(key) {
        const cacheJson = this.readCache();
        if (cacheJson[key]) {
            return true;
        }
        return false;
    }
}