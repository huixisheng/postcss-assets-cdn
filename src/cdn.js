export default class CdnManager {
    constructor(adapter, options) {
        this.adapter = adapter;
        if (adapter === 'oss') {
            const AliOss = require('ali-oss');
            this.client = new AliOss(options);
        }
    }

    upload(key, uploadFile) {
        return this.uploadAdapter(key, uploadFile);
    }

    uploadAdapter(key, uploadFile) {
        return new Promise((resolve, reject) => {
            if (this.adapter === 'oss') {
                this.ossUpload(key, uploadFile)
                    .then((res) => {
                        // console.log('uploadAdapter success');
                        resolve(res);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
        });
    }

    ossUpload(key, uploadFile) {
        return new Promise((resolve, reject) => {
            try {
                this.client
                    .put(key, uploadFile)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        console.error(error);
                        reject(error);
                    });
            } catch (error) {
                reject(error);
            }
        });

    }
}
