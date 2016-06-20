'use strict';


class Benchmark {
  constructor() {
    this.cache = new Map();
    this.enabled = false;
  }

  mark(id, time) {
    if (!this.enabled) {
      return;
    }

    time = time || Date.now();
    const cache = this.cache;

    let item = cache.get(id);
    if (item) {
      item.cost = time - item.time;
    } else {
      item = {
        id: id,
        time: time
      };
      cache.set(id, item);
    }
  }


  report() {
    const items = Array.from(this.cache.values());
    items.sort((left, right) => {
      return left.time - right.time;
    });
    return items;
  }
}


module.exports = Benchmark;
