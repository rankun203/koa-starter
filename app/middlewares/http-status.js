/**
 * Created on 1/7/16.
 * @author rankun203
 */
'use strict';

module.exports = function* httpStatus(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.body   = {msg: err.msg || err.message};
  }

};
