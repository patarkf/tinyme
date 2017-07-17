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

/**
 * Starts the minification process of the application.
 */
exports.minifyImages = async function (path) {
  try {
    if (typeof path === 'undefined') {
      throw new Error('Please define a path');
    }

    await Application.setAndValidateApiKey(this.getApiKey());
    await Application.run(path);

    Logger.info('Finished');
  } catch (err) {
    Logger.error(err.message);
  }
};

/**
 * Gets and prints the total number of minified images based
 * on the previously set API key.
 */
exports.getCompressionCount = async function () {
  try {
    await Application.setAndValidateApiKey(this.getApiKey());
    const numberOfMinifiedImages = await Application.getCompressionCount();

    Logger.info(`You have already minified ${numberOfMinifiedImages} image(s)`);
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
      throw new Error('Please provide your API key');
    }

    writeFileSync(`${globalModulesPath}/tinyme/variables.env`, `TINYME_API_KEY="${cliApiKey}"`);
  } catch (err) {
    Logger.error(err.message);
  }
};

/**
 * Returns the previously set API key.
 */
exports.getApiKey = function () {
  config({ path: `${globalModulesPath}/tinyme/variables.env` });

  const apiKey = process.env.TINYME_API_KEY;
  if (typeof apiKey === 'undefined' || !apiKey.length) {
    throw new Error('Please provide your API key');
  }

  return apiKey;
}
