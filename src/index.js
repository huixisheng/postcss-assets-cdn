import postcss from 'postcss';
import path from 'path';
// import md5File from 'md5-file';
import CdnManager from './cdn';
import Cache from './cache';
import { getEtagSync } from './libs/index';

function getFullPath(str, relativeFile) {
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
    const assetsDir = opts.assetsDir;

    return function (root, result) {
        root.walkDecls(/background/, decl => {
            // https://regex101.com/r/kU7cC9/7
            decl.value = decl.value.replace(/url\s*\(\s*[\"\']?(.*?)[\"\']?\s*\)/, (match, s1) => {
                if (s1.indexOf('http') == 0) {
                    return 'url(' + s1 + ')';
                }
                const file = getFullPath(s1, root.source.input.file);
                // const hash = md5File.sync(file, match);
                const division = assetsDir ? '/' : '';
                const etag = getEtagSync(file);
                const hash = assetsDir + division + etag;
                const assetsUrl = [opts.baseUrl || '', hash].join('/');

                if (!cache.hasCache(hash)) {
                    uploadListPromise.push(
                        cdnManagerInstance.upload(hash, file)
                            .then(() => {
                                cache.set(etag, {
                                    url: assetsUrl,
                                    file
                                });
                            }).catch((error) => {
                                console.log(error);
                            })
                    );
                }

                // getEtagPromise(file)
                //     .then((etag) => {
                //         uploadListPromise.push(cdnManagerInstance.upload(etag, file));
                //         decl.value = decl.value.replace(match, [opts.baseUrl || '', etag].join('/'));
                //     });
                return 'url(' + assetsUrl + ')';
            });
        });
        // console.log(uploadListPromise);
        return Promise.all(uploadListPromise);
    };
});
