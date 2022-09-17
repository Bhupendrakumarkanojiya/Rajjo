const config = require('../config');
const errorCodes = require('../error-codes');
const { RequestError } = require('./request-error');

const notFound = req => {
  let message = `No route found for ${req.method} ${req.path}`;
  if (config.express.verbose404) {
    message += '. Refer to app/index.js for a complete list of routes.';
  }
  const error = new RequestError(message);
  error.status = errorCodes.notFound;
  throw error;
};

module.exports = notFound;
