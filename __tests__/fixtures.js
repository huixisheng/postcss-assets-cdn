import testFixtures from 'postcss-test-fixtures';
import configDeploy from 'x-config-deploy';

testFixtures.config({
    pluginOpts: {
        baseUrl: configDeploy.get('postcssAssetsCdn.baseUrl'),
        cache: '.cache.json',
        ossConfig: configDeploy.get('postcssAssetsCdn.oss'),
        assetsDir: configDeploy.get('postcssAssetsCdn.assetsDir')
    }
});
testFixtures.run();
