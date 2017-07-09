/**
 * Local modules
 */
const Application = require('./app');
const Logger = require('./helpers/logger');

/**
 * Initializes the application.
 */
async function initialize(path, apiKey) {
  try {
    if (typeof path === 'undefined') {
      throw new Error('You have to define a path');
    }

    if (typeof apiKey === 'undefined') {
      throw new Error('You must pass an API key at least one time.');
    }

    await Application.setApiKey(apiKey);
    await Application.run(path);

    Logger.info('Finished');
  } catch (err) {
    Logger.error(err.message);
  }
}

module.exports = initialize;
