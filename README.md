# postcss-assets-cdn [![Build Status][travis-image]][travis-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> postcss-assets-cdn

This [PostCSS] plugin will transform this:

```
.foo {
  background: url('/assets/alipay.png')
}
```

To this:

```
.foo {
  background: url(https://huixisheng.github.com/Fg0s0GU_xDPd2rOgAYYikJDTiEhL)
}
```

## Installation

```
npm i -D postcss-assets-cdn
```

## Usage

```
postcss([ require('postcss-assets-cdn') ])
```

## Config

```
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
```

> install x-config-deploy Setting to configure sensitive information

[coveralls-image]: https://coveralls.io/repos/huixisheng/postcss-assets-cdn/badge.svg
[coveralls-url]: https://coveralls.io/r/huixisheng/postcss-assets-cdn
[travis-image]: https://travis-ci.org/huixisheng/postcss-assets-cdn.svg?branch=master
[travis-url]: https://travis-ci.org/huixisheng/postcss-assets-cdn
[PostCSS]: https://github.com/postcss/postcss
