import postcss from 'postcss';
import path from 'path';
// import md5File from 'md5-file';
import CdnManager from './cdn';
import Cache from './cache';
import { getEtagSync } from './libs/index';

function getFullPath(str, relativeFile) {
    console.log(str, relativeFile);
    if (str.indexOf('/') === 0) {
        return path.join(process.cwd(), str);
    }
    return path.join(path.dirname(relativeFile), str);
}

module.exports = postcss.plugin('postcss-assets-cdn', opts => {
    opts = opts || {};
    let uploadListPromise = [];
    let cdnManagerInstance = new CdnManager('oss', opts.ossConfig);
    const cache = new Cache({ cache: path.join(process.cwd(), opts.cache) });

    return function (root, result) {
        root.walkDecls(/background/, decl => {
            // https://regex101.com/r/kU7cC9/7
            decl.value = decl.value.replace(/url\s*\(\s*[\"\']?(.*?)[\"\']?\s*\)/, (match, s1) => {
                if (s1.indexOf('http') == 0) {
                    return 'url(' + s1 + ')';
                }
                const file = getFullPath(s1, root.source.input.file);
                // const hash = md5File.sync(file, match);
                const hash = getEtagSync(file);
                console.log('hash', hash);
                if (!cache.hasCache(hash)) {
                    uploadListPromise.push(
                        cdnManagerInstance.upload(hash, file)
                            .then(() => {
                                cache.set(hash, true);
                            })
                    );
                }

                // getEtagPromise(file)
                //     .then((etag) => {
                //         uploadListPromise.push(cdnManagerInstance.upload(etag, file));
                //         decl.value = decl.value.replace(match, [opts.baseUrl || '', etag].join('/'));
                //     });
                return 'url(' + [opts.baseUrl || '', hash].join('/') + ')';
            });
        });
        // console.log(uploadListPromise);
        return Promise.all(uploadListPromise);
    };
});