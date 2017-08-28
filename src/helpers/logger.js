const winston = require('winston');

/**
 * @name Logger
 * @description Creates an instance of Winston an returns it as a Single Instance Pattern.
 * @see {@link https://github.com/winstonjs/winston} for Winston logger information.
 * @author Patrick Ferreira <paatrickferreira@gmail.com>
 */
exports.logger = new (winston.Logger)({
  transports: [new (winston.transports.Console)({ level: 'verbose', colorize: true })],
});

