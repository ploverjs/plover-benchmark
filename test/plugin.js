'use strict';


const pathUtil = require('path');
const plover = require('plover');
const request = require('supertest');


const plugin = require('../lib/plugin');

const sleep = require('./fixtures/app/lib/sleep');


describe('plugin', function() {
  const root = pathUtil.join(__dirname, 'fixtures/app');

  it('run with benchmark', function() {
    const settings = {
      applicationRoot: root,
      benchmark: {
        enable: true
      }
    };

    const app = create(settings);
    app.addMiddleware(CacheService);

    return request(app.callback())
      .get('/').expect(200);
  });


  it('run without benchmark for default', function() {
    const app = create({ applicationRoot: root });
    app.addMiddleware(CacheService);

    return request(app.callback())
      .get('/').expect(200);
  });


  it('ignore for simple request', function() {
    const app = create({ applicationRoot: root });
    return request(app.callback())
      .get('/404').expect(404);
  });
});


function* CacheService(next) {
  const done = this.benchmark.mark('cache-service');
  yield sleep(60);
  done();
  yield* next;
}


function create(settings) {
  const app = plover(settings);
  plugin(app);
  app.addEngine('art', require('plover-arttemplate'));
  return app;
}
