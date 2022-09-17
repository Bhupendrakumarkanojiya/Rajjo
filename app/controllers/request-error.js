const errorCodes = require('@app/error-codes');

class RequestError extends Error {
  constructor(...args) {
    super(...args);
    this.status = errorCodes.serverError;
    Error.captureStackTrace(this, RequestError);
  }
}

module.exports = { RequestError };
