import getEtag from './qetag';
import fs from 'fs';

// export function getEtagPromise(file) {
//     return new Promise((resolve, reject) => {
//         getEtag(file, (etag) => {
//             console.log('getEtag', etag);
//             resolve(etag);
//         });
//         // throw new Error('getEtag error');
//         reject();
//     });
// }

export function getEtagSync(file) {
    const etag = getEtag(fs.readFileSync(file));
    return etag;
}
