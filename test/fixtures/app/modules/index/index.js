'use strict';


const sleep = require('../../lib/sleep');


exports.view = function* () {
  yield sleep(20);


  this.render();
};


exports.item = function* () {
  yield sleep(10);
  this.render();
};
