'use strict';


const fmt = require('output-formatter');

const logger = require('plover-logger')('plover-benchmark');


/* eslint no-process-env: 0, no-console: 0 */


module.exports = function(app) {
  app.addService('benchmark', require('./benchmark'));

  const config = app.settings.benchmark || {};
  if (config.enable || process.env.DEBUG_BENCHMARK) {
    logger.info('enable benchmark');

    app.addFilter(require('./filter'));

    app.addMiddleware(function* PloverBenchmark(next) {
      this.benchmark.enabled = true;
      this.benchmark.mark('request');
      yield* next;
      this.benchmark.mark('request');

      const items = this.benchmark.report();
      if (items.length > 1) {
        log(this.url, items);
      }
    }, { level: 0 });
  }
};


function log(url, items) {
  let output = fmt.center('plover-benchmark', 100) + '\n';
  output += fmt.line('-', 80) + '\n';
  output += fmt.center('id', 50) +
      fmt.center('cost(ms)', 30) + '\n';
  output += fmt.line('-', 80) + '\n';

  for (const item of items) {
    output += fmt.left(item.id, 50) +
        fmt.right(item.cost, 30) + '\n';
  }

  logger.info(output);
  if (process.env.DEBUG_BENCHMARK) {
    console.log(output);
  }
}
