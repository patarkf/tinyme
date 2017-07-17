/**
 * Node modules
 */
const globalModulesPath = require('global-modules');
const { config } = require('dotenv');
const { writeFileSync } = require('fs');

/**
 * Local modules
 */
const Application = require('./app');
const Logger = require('./helpers/logger');

config({ path: `${globalModulesPath}/tinyme/variables.env` });

/**
 * Starts the minification process of the application.
 */
exports.minifyImages = async function (path) {
  try {
    if (typeof path === 'undefined') {
      throw new Error('Please, you must define a path');
    }

    await Application.setAndValidateApiKey(this.getApiKey());
    await Application.run(path);

    Logger.info('Finished');
  } catch (err) {
    Logger.error(err.message);
  }
};

/**
 * Sets and stores an API key as environment variable.
 */
exports.setApiKey = function (cliApiKey) {
  try {
    if (typeof cliApiKey === 'undefined') {
      throw new Error('There is no API key set, please provide it');
    }

    writeFileSync(`${globalModulesPath}/variables.env`, `TINYME_API_KEY="${cliApiKey}"`);
  } catch (err) {
    Logger.error(err.message);
  }
};

/**
 * Returns the previously set API key.
 */
exports.getApiKey = () => process.env.TINYME_API_KEY;

