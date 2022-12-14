const { createLogger, format, transports } = require('winston');
const config = require('./config');

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.simple(),
      silent: !config.logger.enabled,
    }),
  ],
});

module.exports = logger;
