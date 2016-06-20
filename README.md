# plover-benchmark


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]


提供性能监控工具方法，记录模块渲染时间


## 接入

在应用中引入此插件

```
npm install --save plover-benchmark
```

1\. 默认情况下不会记录性能日志，可以通过以下配置开启 

```
{
  benchmark: {
    enable: true
  }
}
``` 

2\. 启动时添加环境变量 `DEBUG_BENCHMARK=true` 也可以记录日志


```
$ DEBUG_BENCHMARK=true npm run start
```

## 使用

可以调用`benchmark` service提供的方法来记录调用时间

in middleware

```js
module.exports = function() {
  return function* () {
    ...
    const done = this.benchmark.mark('request-some-data');   // mark start
    yield requestSomeData();
    done();   // mark end
  };
}
```

[npm-image]: https://img.shields.io/npm/v/plover-benchmark.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/plover-benchmark
[travis-image]: https://img.shields.io/travis/plover-modules/plover-benchmark/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/plover-modules/plover-benchmark
[coveralls-image]: https://img.shields.io/codecov/c/github/plover-modules/plover-benchmark.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/plover-modules/plover-benchmark?branch=master

