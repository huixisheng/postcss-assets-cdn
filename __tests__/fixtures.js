import testFixtures from 'postcss-test-fixtures';
import configDeploy from 'x-config-deploy';

console.log(configDeploy);

testFixtures.config({
    pluginOpts: {
        baseUrl: configDeploy.get('ossConfig.baseUrl'),
        cache: '.cache.json',
        ossConfig: {
            accessKeyId: configDeploy.get('ossConfig.accessKeyId'),
            accessKeySecret: configDeploy.get('ossConfig.accessKeySecret'),
            bucket: configDeploy.get('ossConfig.bucket'),
            endpoint: configDeploy.get('ossConfig.endpoint'),
            https: true,
            delDistImg: false,
            region: configDeploy.get('ossConfig.region')
        }
    }
});
testFixtures.run();
