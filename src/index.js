/**
 * Local modules
 */
const Application = require('./app');
const Logger = require('./helpers/logger');

/**
 * Initializes the application.
 */
async function initialize(path) {
  try {
    if (typeof path === 'undefined') {
      throw new Error('You have to define a path');
    }

    await Application.run(path);

    Logger.info('Finished');
  } catch (err) {
    Logger.error(err);
  }
}

module.exports = initialize;
