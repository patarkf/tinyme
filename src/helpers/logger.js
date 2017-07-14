/**
 * Node modules
 */
const winston = require('winston');

/**
 * Wrapper for the Winston logger.
 *
 * @class Logger
 * @package Helpers
 * @author Patrick Ferreira <paatrickferreira@gmail.com>
 * @see https://github.com/winstonjs/winston
 */
class Logger {
  /**
   * Creates an instance of Logger.
   *
   * @memberof Logger
   */
  constructor() {
    const logger = new (winston.Logger)({
      transports: [new (winston.transports.Console)({ level: 'verbose', colorize: true })],
    });

    return logger;
  }
}

module.exports = new Logger();
