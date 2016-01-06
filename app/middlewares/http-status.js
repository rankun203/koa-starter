/**
 * Created on 1/7/16.
 * @author rankun203
 */

module.exports = function* httpStatus(next) {
  try {
    yield next;
  } catch (err) {
    switch (err.status) {
      case 401:
        this.status = 401;
        this.body   = 'Auth failed!';
        break;
      case 500:
        this.status = 500;
        this.body   = 'Server had a problem.';
        break;
      default:
        throw err;
    }
  }

};
