'use strict';


const ID = Symbol('id');
const CACHE = Symbol('cache');


exports.beforeAction = function() {
  const url = this.route.url;
  const cache = this.ctx[CACHE] || (this.ctx[CACHE] = new Map());
  const count = cache.get(url) || 0;

  let space = '';
  let p = this.route.parent;
  while (p) {
    space += ' ';
    p = p.parent;
  }

  this[ID] = space + (count ? `${url}[${count + 1}]` : url);
  cache.set(url, count + 1);

  this.benchmark.mark(this[ID] + '.action');
};


exports.afterAction = function() {
  this.benchmark.mark(this[ID] + '.action');
};


exports.beforeRender = function() {
  this.benchmark.mark(this[ID] + '.render');
};


exports.afterRender = function() {
  this.benchmark.mark(this[ID] + '.render');
};
